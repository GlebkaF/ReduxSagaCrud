import { Reducer } from "redux";
import { tag } from "../types/storeType";
import { gotTags } from "../types/actionsType";
import { RootState } from "../../rootReducer";

type actions = gotTags;

const initialState: tag[] = [];

const tagReducer: Reducer<tag[], actions> = (state = initialState, action) => {
  switch (action.type) {
    case "GOT_TAGS":
      return [...action.tags];
    default:
      return [...state];
  }
};

export default tagReducer;

export const getAllTags = (state: RootState) => state.tags;
