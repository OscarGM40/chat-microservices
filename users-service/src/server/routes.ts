import dayjs from "dayjs";
import { Express } from "express";
import { getConnection, getRepository } from "typeorm";
import User from "#root/db/entities/User";
import omit from "lodash.omit";
import config from "config";
import { generateUUID } from "../helpers/generateUUID";
import UserSession from "#root/db/entities/UserSession";
import { hashPassword, passwordCompareSync } from "#root/helpers/passwordUtils";

// todo: use config lib down here
const USER_SESSION_EXPIRY_HOURS = <number>config.get("USER_SESSION_EXPIRY_HOURS");

const setupRoutes = (app: Express) => {
  // obtengo la conexion(sin args cogerá la por default que es la que ya está abierta)
  const connection = getConnection();
  //accedo al repositorio
  const userRepository = getRepository(User);
  const userSessionRepository = getRepository(UserSession);

  // *** USERS ***
  // fijate que ya sabe mediante la interfaz Express los types de la req o la res luego es buena idea usarla,asinto.Esto es determinant
  app.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await userRepository.findOne(req.params.userId);
      //  este next pasará al ErrorHandler global
      if (!user) return next(new Error("Invalid user ID!"));
      return res.json(user);
    } catch (error) {
      // si es un error del catch lo mando directamente al ErrorHandler global
      return next(error);
    }
  });
  // login user
  app.post("/users", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error("Invalid body!"));
    }
    try {
      const user = await userRepository.findOne({
        username: req.body.username,
      });
      if (user) return next(new Error("User already exists.Please log in."));
      const newUser = {
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
        username: req.body.username,
      };

      await connection.createQueryBuilder().insert().into(User).values([newUser]).execute();
      return res.json(omit(newUser,["passwordHash"])); 
    } catch (error) {
      return next(error);
    }
  });
  // *** SESSIONS ***
  // Login User
  app.post("/sessions", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error("Invalid body!"));
    }
    try {
      const user = await userRepository.findOne(
        {
          username: req.body.username,
        },
        { select: ["id", "passwordHash"] },
      );
      if (!user) return next(new Error("Invalid username!"));
      // compare passwords
      const passwordsMatch = passwordCompareSync(req.body.password, user.passwordHash);
      if (!passwordsMatch) return next(new Error("Passwords don't match!Canalla!"));
      // generar fecha de expiracion
      const expiresAt = dayjs().add(USER_SESSION_EXPIRY_HOURS, "hour").toISOString();
      // generar uuid random de la session
      const sessionToken = generateUUID();
      // generar instancia de Entidad UserSession
      const userSession = {
        expiresAt,
        id: sessionToken,
        userId: user.id,
      };
      // guardamos la userSession usando la conexión.Ojo que values es un arreglo
      connection.createQueryBuilder().insert().into(UserSession).values([userSession]).execute();
      return res.json(userSession);
    } catch (error) {
      return next(error);
    }
  });

  app.delete("/sessions/:sessionId", async (req, res, next) => {
    const sessionId = req.params.sessionId;

    try {
      const userSession = await userSessionRepository.findOne(sessionId);
      if (!userSession) return next(new Error("Invalid session ID"));

      await userSessionRepository.remove(userSession);
      // res.end()va a mandar un 200OK y cortar todo,es lo que queremos.Fijate que esto apenas lo he usado hasta ahora y cuadra perfectamente con lo que queremos
      return res.end();
    } catch (error) {
      return next(error);
    }
  });

  app.get("/sessions/:sessionId", async (req, res, next) => {
    const sessionId = req.params.sessionId;

    try {
      const userSession = await userSessionRepository.findOne(sessionId);
      if (!userSession) return next(new Error("Invalid session ID"));

      return res.json(userSession);
    } catch (error) {
      return next(error);
    }
  });
};

export default setupRoutes;
