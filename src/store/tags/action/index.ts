import { getTagsActionCreator } from "../types/actionsCreatorsTypes";

export const getTags: getTagsActionCreator = () => {
  return {
    type: "GET_TAGS",
  };
};
