import { renderFile } from "../deps.js";
import { getListById } from "../services/listsService.js";
import * as itemsService from "../services/itemsService.js";
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const createNewItem = async (request) => {
  const formData = await request.formData();
  const listId = (new URL(request.url)).pathname.split("/")[2];
  const name = formData.get("name");
  await itemsService.addItemTo(listId, name);
  return redirectTo(`/lists/${listId}`);
};

const markCollected = async (request) => {
  const id = (new URL(request.url)).pathname.split("/")[4];
  const listId = (new URL(request.url)).pathname.split("/")[2];
  await itemsService.markCollected(id);
  return redirectTo(`/lists/${listId}`);
};

const listFormAndItems = async (request) => {
  const id = (new URL(request.url)).pathname.split("/")[2];
  const data = {
    list: await getListById(id),
    items: await itemsService.getItemsInOrder(id),
  };
  if (!data.list) {
    return new Response(await renderFile("notExist.eta"), responseDetails);
  }
  return new Response(await renderFile("items.eta", data), responseDetails);
};

export { createNewItem, listFormAndItems, markCollected };
