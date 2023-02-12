import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import accessEnv from "#root/helpers/accessEnv";
import setupRoutes from "./routes";
// fijate que tengo que parsear a Int and moreover pass it as string
// parece que hay que pasar el 10 para que pille antes que es base 10(really,nigger??)
const PORT = parseInt(accessEnv("PORT", "7101"), 10);

const startServer = () => {
  //
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      // esta linea permite el acceso desde cualquier origen(un * tmb vale)
      origin: (origin, cb) => cb(null, true),
      credentials: true, // para las cookies
    }),
  );
  // esta llamada debe ir antes del Error Handler global.API perfecta
  setupRoutes(app);
  // es un ErrorHandler global porque tiene los 4 parametros.Esto es lo que lo hace operar como ErrorHandler global
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
      message: err.message,
      status:res.statusCode

    })
  });
  //importante que escuche en 0.0.0.0 para que accedamos desde fuera del contenedor
  app.listen(PORT,"0.0.0.0",() => {
    console.info(`Users service listening on ${PORT}`);
  })
};

export default startServer;
