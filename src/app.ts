import express from "express";
import { routes } from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import { env } from "./env";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(
      cors({
        origin:
          env.NODE_ENV === "dev"
            ? [
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:3002",
              ]
            : [],
      }),
    );
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
