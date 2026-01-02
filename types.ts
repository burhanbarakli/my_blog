
export interface Author {
  name: string;
  bio: string;
  avatar: string;
  aboutContent?: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
  imageUrl?: string;
}

export interface GroupedPosts {
  year: number;
  posts: BlogPost[];
}
