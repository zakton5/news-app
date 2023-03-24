import { Story } from "../models/story";

const apiKey = 'e29feb3a260a4d529122b7c931705f5f';
const baseUrl = 'https://newsapi.org/v2';

export class NewsService {
  static async getTopNews(country: string): Promise<Story[]> {
    const topNewsUrl = `${baseUrl}/top-headlines?country=${country}&apiKey=${apiKey}`;
    const res = await fetch(topNewsUrl);
    const json = await res.json();
    const articles: Story[] = json.articles;
    return articles;
  }
}