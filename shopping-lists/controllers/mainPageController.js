import { renderFile } from "./../deps.js";
import * as listService from "../services/statisticsService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const listStatistics = async (request) => {
  const data = {
    listsCount: await listService.shoppingListCount(),
    itemsCount: await listService.listItemsCount(),
  };
  return new Response(await renderFile("mainpage.eta", data), responseDetails);
};

export { listStatistics };
