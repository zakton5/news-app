import { Article } from "../models/article";

const apiKey = 'e29feb3a260a4d529122b7c931705f5f';
const baseUrl = 'https://newsapi.org/v2';

export class NewsService {
  static async getTopNews(country: string): Promise<Article[]> {
    const topNewsUrl = `${baseUrl}/top-headlines?country=${country}&apiKey=${apiKey}`;
    const res = await fetch(topNewsUrl);
    const json = await res.json();
    const articles: Article[] = json.articles;
    return articles;
  }

  static async getTopNewsByQuery(country: string, query: string): Promise<Article[]> {
    const topNewsUrl = `${baseUrl}/top-headlines?country=${country}&apiKey=${apiKey}&q=${query}`;
    const res = await fetch(topNewsUrl);
    const json = await res.json();
    const articles: Article[] = json.articles;
    return articles;
  }

  /**
   * Retrieves a single article.
   * 
   * Using the title here because this API does not return IDs for the articles.
   */
  static async getArticle(country: string, title: string): Promise<Article> {
    const articles = await this.getTopNewsByQuery(country, title);
    return articles[0];
  }
}