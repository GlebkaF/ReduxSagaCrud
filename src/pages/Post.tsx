import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PostForm from "../components/PostForm";
import { selectPosts } from "../store/post/reducers/postReducer";

const Post: FC = () => {
  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (posts.error) {
      toast.error(posts.error, {
        position: "top-right",
      });
    }
  }, [posts.error]);

  return (
    <div className="container">
      <PostForm textBtn="Изменить" />
    </div>
  );
};
export default Post;
