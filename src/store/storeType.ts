import { authors } from "./author/types/storeType";
import posts from "./post/types/storeType";
import { tags } from "./tags/types/storeType";

interface storeType {
  posts: posts;
  authors: authors;
  tags: tags;
}

export default storeType;
