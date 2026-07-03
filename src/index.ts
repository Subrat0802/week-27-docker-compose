import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const db = new PrismaClient();

app.use(express.json());

app.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const response = await db.user.create({
      data: {
        username: Math.random().toString(36).substring(2, 15), // Generate a random username
        password: Math.random().toString(36).substring(2, 15), // Generate a random password
      },
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const users = await db.user.findMany();

    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});