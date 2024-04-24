import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient
} from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';

const client = new DynamoDBDocumentClient({ region: "us-west-1" });

const docClient = DynamoDBDocumentClient.from(client);

// USERS

export const createUser = async ({username, first_name, last_name, email, password_digest}) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Users",
    User: {
      id: uuid,
      username,
      first_name,
      last_name,
      email,
      password_digest
    }
  });
  const response = await docClient.send(command)
  return response;
};

export const updateUser = async ({id, username, first_name, last_name, email, password_digest}) => {
  const command = new UpdateCommand({
    TableName: "Users",
    Key: {
      id
    },
    ExpressionAttributeNames: {
      "#first_name": "first_name",
      "#last_name": "last_name",
      "#password_digest": "password_digest"
    },
    UpdateExpression: "set username = :u, first_name = :fn, last_name = :ln, email = :e, password_digest = :pd",
    ExpressionAttributeValues: {
      ":u": username,
      ":fn": first_name,
      ":ln": last_name,
      ":e": email,
      ":pd": password_digest
    },
    ReturnValues: "ALL_NEW"
  })
  const response = await docClient.send(command)
  return response;
};
