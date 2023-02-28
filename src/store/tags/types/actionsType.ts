import { tag } from "./storeType";

export interface getTags {
  type: "GET_TAGS";
}

// For Reducers

export interface gotTags {
  type: "GOT_TAGS";
  tags: tag[];
}

export const actionIds = {
  GET_TAGS: "GET_TAGS",
};
