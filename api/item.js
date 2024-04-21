import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';

const client = new DynamoDBDocumentClient({ region: "us-west-1" });

const docClient = DynamoDBDocumentClient.from(client);

// ITEMS
export const fetchItems = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: {
      "#user_id": "user_id"
    },
    ProjectionExpression: "id, #user_id, title, image, description, qty, category, condition, make, model, price",
    TableName: "Items"
  });
  const response = await docClient.send(command)
  return response;
};

export const createItem = async ({user_id, title, image, description, qty, category, condition, make, model, price}) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Items",
    Item: {
      id: uuid,
      user_id,
      title,
      image,
      description,
      qty,
      category,
      condition,
      make,
      model,
      price
    }
  });
  const response = await docClient.send(command)
  return response;
};

export const updateItem = async ({id, title, image, description, qty, category, condition, make, model, price}) => {
  const command = new UpdateCommand({
    TableName: "Items",
    Key: {
      id
    },
    ExpressionAttributeNames: {
      "#user_id": "user_id"
    },
    UpdateExpression: "set title = :t, description = :d, qty = :q, category = :cat, condition = :con, make = :mk, model = :ml, price = :p",
    ExpressionAttributeValues: {
      ":t": title,
      ":d": description,
      ":q": qty,
      ":cat": category,
      ":con": condition,
      ":mk": make,
      ":ml": model,
      ":p": price
    },
    ReturnValues: "ALL_NEW"
  })
  const response = await docClient.send(command)
  return response;
};

export const DeleteItem = async (id) => {
  const command = new DeleteCommand({
    TableName: "Items",
    Key: {
      id
    }
  })
  const response = await docClient.send(command)
  return response;
};

