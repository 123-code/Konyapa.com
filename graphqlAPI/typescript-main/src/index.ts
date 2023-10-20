import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { PersonResolver } from "./resolvers/PersonResolver";

(async () => {
  const app = express();
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, PersonResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  try {
    console.log("lleog")
     createConnection({
      name: "production",
      type: "postgres",
      url: "postgres://egzjrwis:zDpjnOzp1g4ss_W-dERys8xk1uIIE6qB@mahmud.db.elephantsql.com/egzjrwis",
      synchronize: true, // Switch this to false once you have the initial tables created and use migrations instead
      logging: true, // Enable logging for debugging (optional)
      entities: ["dist/entity/**/*.js"],
      migrations: ["dist/migration/**/*.js"],
      subscribers: ["dist/subscriber/**/*.js"],
    });
  } catch (error) {
    console.error("Unable to connect to the database", error);
    process.exit(1);
  }

  apolloServer.applyMiddleware({ app, cors: true });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
  });
})();
