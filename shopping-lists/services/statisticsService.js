import { sql } from "../database/database.js";

const shoppingListCount = async () => {
  const result = await sql`SELECT COUNT(*) AS number FROM shopping_lists`;
  return Number(result[0]?.number);
};

const listItemsCount = async () => {
  const result = await sql`SELECT COUNT(*) AS number FROM shopping_list_items`;
  return Number(result[0]?.number);
};

export { listItemsCount, shoppingListCount };
