export interface Story {
  title: string;
  description: string | null;
  content: string | null;
  author: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}
