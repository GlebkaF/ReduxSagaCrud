import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../store/rootReducer";
import { deletePost } from "../store/post/action";
import { selectPosts } from "../store/post/reducers/postReducer";
import Pagination from "../components/Pagination";
import PostForm from "../components/PostForm";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (posts.error) {
      toast.error(posts.error, {
        position: "top-right",
      });
    }
  }, [posts.error]);

  const changePage = (newPage: number) =>
    dispatch({ type: "POST_LOADING", page: newPage });

  return (
    <div className="container">
      <PostForm textBtn="Добавить" />
      {posts.loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Pagination
        totalPage={posts.totalPage}
        onChange={changePage}
        page={posts.page}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {posts?.post.map((post, index) => (
            <tr key={index}>
              <th scope="row">{post.id}</th>
              <td>{post.title}</td>
              <td>{post.authorName}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => {
                    dispatch(deletePost(post.id));
                  }}
                >
                  Удалить
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-secondary "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => {
                    dispatch({ type: "CLEAR_DETAILPOST" });
                    history.push(`/post/${post.id}`);
                  }}
                >
                  Просмотреть/изменить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;
