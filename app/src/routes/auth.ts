import { Router, Request, Response } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const router = Router();
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

router.get("/hello", (req: Request, res: Response) => {
  res.json("hello again");
});

router.post("/user", (req: Request, res: Response) => {
  console.log(req.body)
  const { userId, playlistId } = req.body;
  const command = new PutCommand({
    TableName: "sotf_users",
    Item: {
      userId: userId,
      playlistId: playlistId
    },
  });

  docClient.send(command)
  res.json("hello again");
});

export default router;
