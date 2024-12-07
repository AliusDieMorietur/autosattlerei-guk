import { erase } from "./delete";
import { getList } from "./getList";
import { submit } from "./submit";
import { update } from "./update";

export const contact = {
  submit,
  delete: erase,
  getList,
  update,
};
