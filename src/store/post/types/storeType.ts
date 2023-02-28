export type post = {
  id: number;
  title: string;
  code: string;
  authorName: string;
  previewPicture: {};
  tagNames: [];
  updatedAt: string;
  createdAt: string;
};

type tag = {
  id: number;
  name: string;
  code: string;
};

type author = {
  id: number;
  fullName: string;
  avatar: {};
};

type previewPicture = {
  id: number;
  name: string;
  url: string;
};

export interface detailPost {
  id: number;
  title: string;
  code: string;
  text: string;
  previewPicture: previewPicture;
  author: author;
  tags: tag[];
  updatedAt: string;
  createdAt: string;
}

export type posts = {
  post: post[];
  error: string | null;
  loading: boolean;
  success: boolean;
  totalPage: number;
  page: number;
  detailPost: detailPost | null;
};

export default posts;
