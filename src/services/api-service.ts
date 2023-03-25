import { Article } from '../models/article';

const apiKey = 'e29feb3a260a4d529122b7c931705f5f';
const baseUrl = 'https://newsapi.org/v2';

export class NewsService {
  static async getTopNews(country: string, query?: string, category?: string): Promise<Article[]> {
    let topNewsUrl = `${baseUrl}/top-headlines?country=${country}&apiKey=${apiKey}`;

    if (category) {
      topNewsUrl += `&category=${category}`;
    }
    if (query) {
      topNewsUrl += `&q=${query}`;
    }

    const res = await fetch(topNewsUrl);
    const json = await res.json();
    const articles: Article[] = json.articles;
    return articles;
  }

  /**
   * Retrieves a single article.
   *
   * Using the title here because this API does not return IDs for the articles.
   * Pass a category when searching an article selected from the categories page
   * otherwise it will not be found. 
   */
  static async getArticle(country: string, title: string, category?: string): Promise<Article | null> {
    console.log('getting article, ', country, title, category);
    const articles = await this.getTopNews(country, title, category);
    return articles.length ? articles[0] : null;
  }
}
