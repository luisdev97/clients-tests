import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { dbCreateConnection } from "orm/dbCreateConnection";

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

try {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../log/access.log"),
    {
      flags: "a",
    }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan("combined"));

const port = process.env.API_PORT || 6000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
