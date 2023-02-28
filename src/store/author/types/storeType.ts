export type author = {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  avatar: {};
  updatedAt: string;
  createdAt: string;
};

export type authors = {
  author: author[];
  error: string | null;
  loading: boolean;
  success: boolean;
};

export default authors;
