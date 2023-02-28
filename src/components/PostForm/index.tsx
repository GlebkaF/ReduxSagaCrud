import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllAuthors } from "../../store/author/reducers/authorReducer";
import { getAllTags } from "../../store/tags/reducers/tagReducer";
import { selectDetailPost } from "../../store/post/reducers/postReducer";
import { createPost, editPost, getPost } from "../../store/post/action";

type postFormProps = {
  textBtn: string;
};

type stateTags = any;

const PostForm = ({ textBtn }: postFormProps) => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLSelectElement>(null);
  const previewPictureRef = useRef<HTMLInputElement>(null);

  const authors = useSelector(getAllAuthors);
  const allTags = useSelector(getAllTags);

  useEffect(() => {
    if (id) {
      dispatch(getPost(Number(id)));
    }
  }, [id, dispatch]);

  const post = useSelector(selectDetailPost);
  const [tagsPost, setTagsPost] = useState<stateTags>([]);

  useEffect(() => {
    if (post?.tags !== undefined) {
      const tagIds: any = [];
      post?.tags.forEach((item) => tagIds.push(item.id));
      setTagsPost(tagIds);
    } else return;
  }, [post]);

  useEffect(() => {
    if (id) {
      const objectUrl = selectedFile && URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile, id]);

  const onFileDrop = (e: any) => {
    const { target } = e;
    if (!target.files) return;
    setSelectedFile(target.files[0]);
  };

  const handleClick = () => {
    if (titleRef.current && authorRef.current && textRef.current) {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("text", textRef.current.value);
      formData.append("authorId", authorRef.current.value);

      if (tagsPost.length > 0) {
        tagsPost.forEach((el: any) => {
          formData.append("tagIds[]", el);
        });
      }
      if (selectedFile) {
        formData.append("previewPicture", selectedFile);
      }

      if (textBtn === "Изменить") {
        dispatch(editPost(formData, id));
      }
      if (textBtn === "Добавить") {
        dispatch(createPost(formData));

        titleRef.current.value = "";
        textRef.current.value = "";
        authorRef.current.value = "";
        setSelectedFile([]);
        setTagsPost([]);
      }
    }
  };

  const checkAuthor = (selectAuthor: string) => {
    if (post?.author.fullName === selectAuthor) {
      return true;
    }
    return false;
  };

  return (
    <div className="container">
      <div className="mx-auto card mt-5 p-5" style={{ gap: "10px" }}>
        <p style={{ color: "red" }}>
          <i>Поля отмеченные * обязательны к заполнению!</i>
        </p>
        <div className="form-floating">
          <input
            type="title"
            className="form-control"
            id="title"
            defaultValue={id && post ? post.title : ""}
            ref={titleRef}
          />
          <label htmlFor="title">Title*</label>
        </div>
        <div className="form-floating">
          <select
            className="form-select"
            name="author"
            id="author"
            ref={authorRef}
            defaultValue={"DEFAULT"}
          >
            {id ? (
              <option value={post?.author.fullName} disabled>
                {post?.author.fullName}
              </option>
            ) : (
              <option value="DEFAULT" disabled>
                Выберите автора
              </option>
            )}
            {authors
              ? authors.map((author) => (
                  <option
                    selected={checkAuthor(
                      `${author.lastName} ${author.name} ${author.secondName}`
                    )}
                    key={v4()}
                    value={author.id}
                  >{`${author.lastName} ${author.name} ${author.secondName}`}</option>
                ))
              : null}
          </select>
          <label htmlFor="author">Author*</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            id="text"
            ref={textRef}
            defaultValue={post ? post.text : ""}
          ></textarea>
          <label htmlFor="text">Text*</label>
        </div>
        <div
          className="form-floating form-control"
          style={{ display: "flex", gap: "10px" }}
        >
          {tagsPost.length > 0 ? (
            allTags
              .filter((item) => tagsPost.includes(item.id))
              .map((tag) => (
                <button
                  key={v4()}
                  className="w-auto btn btn-sm"
                  style={{ backgroundColor: "#e9ecef" }}
                >
                  {tag.name}
                </button>
              ))
          ) : (
            <p>Теги не назначены</p>
          )}
        </div>
        <label htmlFor="tags">
          <i>Добавьте еще теги</i>
        </label>
        <div
          id="tags"
          className="form-floating"
          style={{ display: "flex", gap: "10px" }}
        >
          {allTags
            ? allTags.map((tag) => (
                <button
                  key={v4()}
                  disabled={tagsPost.includes(tag.id)}
                  className="w-auto btn btn-sm btn-warning"
                  onClick={() => {
                    setTagsPost([...tagsPost, tag.id]);
                  }}
                >
                  {tag.name}
                </button>
              ))
            : null}
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="mb-3">
            <i>Добавьте изображение*</i>
          </label>
          <input
            type="file"
            className="form-control"
            id="formFile"
            ref={previewPictureRef}
            onChange={(e) => onFileDrop(e)}
            defaultValue={post ? post?.previewPicture.name : ""}
          />
        </div>
        {id && (
          <div className="text-center container-sm">
            {post && !preview ? (
              <img
                src={post.previewPicture.url}
                className="rounded"
                alt="pictures"
                style={{ maxWidth: "200px" }}
              />
            ) : null}
            {preview ? (
              <img
                src={preview}
                className="rounded"
                alt="pictures"
                style={{ maxWidth: "200px" }}
              />
            ) : null}
          </div>
        )}

        <button
          onClick={handleClick}
          className="w-100 btn btn-lg btn-warning mt-3"
        >
          {textBtn}
        </button>
      </div>
    </div>
  );
};
export default PostForm;
