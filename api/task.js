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
  const command = new PutCommand({
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