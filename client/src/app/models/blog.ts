export type Blog = {
    id: number;
    title: string;
    content: string;
    slug: string;
    image: string;
    excerpt: string;
    createdAt: Date;
    userId: string;
    categoryId: number;
    category: {
        name: string;
    };
  }
  