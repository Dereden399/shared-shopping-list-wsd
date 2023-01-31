import { renderFile } from "../deps.js";
import * as listService from "../services/listsService.js";
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showFormAndLists = async () => {
  const data = {
    activeLists: await listService.listActiveLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const handleCreateList = async (request) => {
  const formData = await request.formData();
  await listService.createNew(formData.get("name"));
  return redirectTo("/lists");
};

const handleDeactivate = async (request) => {
  const id = (new URL(request.url)).pathname.split("/")[2];
  await listService.deactivateById(id);
  return redirectTo("/lists");
};

export { handleCreateList, handleDeactivate, showFormAndLists };
