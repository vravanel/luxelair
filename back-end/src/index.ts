import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdResolver } from "./resolvers/AdResolver";
import User from "./entities/user";
import { UserResolver } from "./resolvers/UserResolver";
import { BookingResolver } from "./resolvers/BookingResolver";
import { PaymentResolver } from "./resolvers/PaymentResolver";
import { AuthChecker } from "type-graphql";
import  { Response } from "express";
import { getUserSessionIdFromCookie } from "./utils/cookie";
import { getDataSource } from "./database";
import { getCache } from "./cache";
import { generateUsers } from "./fixtures/user";
import { generateAds } from "./fixtures/ad";

export type Context = { req: any; res: Response; user: User | null };

const authChecker: AuthChecker<Context> = ({ context }) => {
  return Boolean(context.user);
};

const buildSchemaAsync = async () => {
  const { buildSchema } = await import("type-graphql");
  return buildSchema({
    resolvers: [AdResolver, UserResolver, BookingResolver, PaymentResolver],
    validate: true,
    authChecker,
  });
};

const startServer = async () => {
  const schema = await buildSchemaAsync();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }: { req: any; res: any }): Promise<Context> => {
      const userSessionId = getUserSessionIdFromCookie(req);
      const user = userSessionId
        ? await User.getUserWithSessionId(userSessionId)
        : null;
      return { req, res, user };
    },
  });

  await getDataSource();

  if (process.env.NODE_ENV === "dev") {
    await generateUsers();
    await generateAds();
  }
  await getCache();

  console.log(`🚀  Server ready at : ${url}`);
};

startServer();
