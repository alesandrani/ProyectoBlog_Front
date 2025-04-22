export interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  isPublic: boolean;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  userId: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  imageUrl?: string;
  category?: string;
  views?: number;
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
