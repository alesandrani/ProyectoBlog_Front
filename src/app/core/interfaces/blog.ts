export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  isPublic: boolean;
  author: {
    id: string;
    name: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  imageUrl?: string;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  summary: string;
  isPublic: boolean;
  tags: string[];
  imageUrl?: string;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  summary?: string;
  isPublic?: boolean;
  tags?: string[];
  imageUrl?: string;
}
