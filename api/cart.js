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


// CARTS
export const fetchCarts = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: {
      "#user_id": "user_id"
    },
    ProjectionExpression: "id, #user_id, active, purchased",
    TableName: "Carts"
  });
  const response = await docClient.send(command)
  return response;
};

export const createCart = async ({user_id}) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Carts",
    Cart: {
      id: uuid,
      user_id,
      cart_items
    }
  });
  const response = await docClient.send(command)
  return response;
};

export const updateCart = async ({id, cart_items}) => {
  const command = new UpdateCommand({
    TableName: "Carts",
    Key: {
      id
    },
    ExpressionAttributeNames: {
      "#cart_items": "cart_items"
    },
    UpdateExpression: "set cart_items = :ci",
    ExpressionAttributeValues: {
      ":ci": cart_items
    },
    ReturnValues: "ALL_NEW"
  })
  const response = await docClient.send(command)
  return response;
};

export const deleteCart = async (id) => {
  const command = new DeleteCommand({
    key: {
      id
    }
  })
  const response = await docClient.send(command)
  return response;
};

