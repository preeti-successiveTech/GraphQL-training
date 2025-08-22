// src/server/express.js
import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { pubsub } from "./pubsub.js"; // Import the pubsub instance

import { typeDefs } from "../schema/typeDefs.js";
import { resolvers } from "../schema/resolvers.js";
import { SERVER_CONFIG } from "../config/serverConfig.js";
import { connectDB } from "../config/db.js";
import { verifyToken } from "../utils/auth.js";

export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  await connectDB();
  // Attach HTTP middleware
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const verifyUser = await verifyToken(token.replace("Bearer ", ""));

        return { pubsub, verifyUser };
      },
    })
  );

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: SERVER_CONFIG.GRAPHQL_PATH,
  });

  useServer(
    {
      schema,
      context: async () => ({ pubsub }), // 👈 inject pubsub in WS context
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;
