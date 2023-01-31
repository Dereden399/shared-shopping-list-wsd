import { configure, serve } from "./deps.js";
import { redirectTo } from "./utils/requestUtils.js";
import * as mainPageController from "./controllers/mainPageController.js";
import * as listsController from "./controllers/listsController.js";
import * as itemsController from "./controllers/itemsController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/") return await mainPageController.listStatistics();
  if (path === "/lists" && request.method === "POST") {
    return await listsController.handleCreateList(request);
  }
  if (path === "/lists") return await listsController.showFormAndLists();
  if (path.match("lists/[0-9]+/deactivate") && request.method == "POST") {
    return await listsController.handleDeactivate(request);
  }
  if (
    path.match("lists/[0-9]+/items/[0-9]+/collect") && request.method == "POST"
  ) {
    return await itemsController.markCollected(request);
  }
  if (path.match("lists/[0-9]+/items") && request.method == "POST") {
    return await itemsController.createNewItem(request);
  }

  if (path.match("lists/[0-9]+")) {
    return await itemsController.listFormAndItems(request);
  }
  return redirectTo("/");
};

serve(handleRequest, { port: 7777 });
