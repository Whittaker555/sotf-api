import { Router, Request, Response } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const router = Router();
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

router.post("/user", async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    const { userId, playlistId } = req.body;

    const newItem = { userId, playlistId };

    const command = new PutCommand({
      TableName: "sotf_users",
      Item: newItem,
    });

    await docClient.send(command);
    res.status(200).json(newItem);
  } catch (error) {
    console.error("Error inserting item into DynamoDB:", error);
    res.status(500).json({ error: "Failed to insert user" });
  }
});

export default router;
