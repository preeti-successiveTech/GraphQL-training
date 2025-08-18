//index.js

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { typeDefs } from "./src/schema/typeDefs.js";
import { resolvers } from "./src/schema/resolvers.js";
import { SERVER_CONFIG } from "./src/config/serverConfig.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: SERVER_CONFIG.PORT },
});

console.log(`🚀 Server ready at ${url}`);
