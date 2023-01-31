import { sql } from "../database/database.js";

const getItemsInOrder = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id =${listId} ORDER BY CASE WHEN collected = false THEN 1 ELSE 2 END, name;`;
};

const addItemTo = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items(shopping_list_id, name) VALUES(${listId}, ${name})`;
};

const markCollected = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
};

export { addItemTo, getItemsInOrder, markCollected };
