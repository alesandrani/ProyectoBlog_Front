export interface Post {
  id: string;
  title: string;
  content: string;
  blogId: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  imageUrl?: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  blogId: string;
  tags: string[];
  imageUrl?: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  tags?: string[];
  imageUrl?: string;
}
