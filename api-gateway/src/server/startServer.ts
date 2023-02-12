import resolvers from "#root/graphql/resolvers/index";
import schema from "#root/graphql/schema";
import { ApolloServer } from "apollo-server-express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import formatGraphQLErrors from "./formatGraphQLErrors";
import injectSession  from "./middleware/injectSession";

// fijate que él siempre pone en el 7000 el Gateway
// const PORT = parseInt(accessEnv("PORT", "7000")); <- con process.env
const PORT = parseInt(config.get("PORT"));
const startServer = () => {
  // 1 creamos el server de apollo con su config
  const apolloServer = new ApolloServer({
    context: (a) => a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs: schema,
  });
  // 2 creamos el server de express
  const app = express();
  // 3 le ajustamos los middlewares
  app.use(cookieParser());
  app.use(
    cors({
      // un * tmb vale pero Google Chrome no lo interpreta bien,luego no usar
      origin: (origin, cb) => cb(null, true),
      credentials: true, // para las cookies
    }),
  );
  
  app.use(injectSession)
  // 4 le pasamos a apollo el server de express.Ojo,hay que pasar las cors a false pues ya las hemos seteado
  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`API Gateway listening on ${PORT}`);
  });
};

export default startServer;
