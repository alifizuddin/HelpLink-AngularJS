import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsSource {
  name: string;
  url?: string;
}

export interface NewsArticle {
  title: string;
  description?: string;
  content?: string;
  url: string;
  image?: string;
  publishedAt: string;
  source?: NewsSource;
}

export interface NewsResponse {
  totalArticles?: number;
  articles?: NewsArticle[];
  error?: string;
}

export interface NewsQuery {
  q?: string;
  lang?: string;
  country?: string;
  max?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  /**
   * Fetch headlines from the GNews proxy.
   * All filters are optional and map directly to the proxy's query string.
   */
  getNews(query: NewsQuery = {}): Observable<NewsResponse> {
    let params = new HttpParams();

    if (query.q) {
      params = params.set('q', query.q);
    }
    if (query.lang) {
      params = params.set('lang', query.lang);
    }
    if (query.country) {
      params = params.set('country', query.country);
    }
    if (query.max) {
      params = params.set('max', String(query.max));
    }

    return this.http.get<NewsResponse>(this.apiUrl, { params });
  }
}
