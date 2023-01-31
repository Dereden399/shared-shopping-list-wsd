import { sql } from "../database/database.js";

const createNew = async (name) => {
  await sql`INSERT INTO shopping_lists(name) VALUES(${name})`;
};

const listActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const deactivateById = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const getListById = async (id) => {
  return (await sql`SELECT * FROM shopping_lists where id = ${id}`)[0];
};

export { createNew, deactivateById, getListById, listActiveLists };
