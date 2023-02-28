export type tag = {
  id: number;
  name: string;
  code: string;
  sort: number;
  updatedAt: string;
  createdAt: string;
};

export type tags = {
  tags: tag[];
};
