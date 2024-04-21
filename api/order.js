import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';


const client = new DynamoDBDocumentClient({ region: "us-west-1" });

const docClient = DynamoDBDocumentClient.from(client);


// ORDERS
export const fetchOrders = async (user_id) => {
  const command = new ScanCommand({
    ExpressionAttributeNames: {
      "#user_id": "user_id",
      "#cart_id": "cart_id"
    },
    ProjectionExpression: "id, #user_id, #cart_id",
    TableName: "Orders"
  });
  const response = await docClient.send(command)
  return response;
};

export const createOrder = async () => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Orders",
    Order: {
      id: uuid,
      cart_id
    }
  })
  const response = await docClient.send(command)
  return response;
};

// typically cannot alter an order after placed
// export const updateOrder = async () => {
//   const command = new 

//   const response = await docClient(command)
//   return response;
// };

// export const deleteOrder = async () => {
//   const command = new 

//   const response = await docClient(command)
//   return response;
// };