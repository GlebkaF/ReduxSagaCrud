import { getAuthorsActionCreator } from "../types/actionsCreatorsTypes";

export const getAuthors: getAuthorsActionCreator = () => {
  return {
    type: "GET_AUTHORS_REQUEST",
  };
};
