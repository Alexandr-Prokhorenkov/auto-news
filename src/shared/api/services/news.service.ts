import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem, NewsResponse } from '../../types/news.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://webapi.autodoc.ru/api/news';

  getNews(page: number = 1, pageSize: number = 10): Observable<NewsResponse> {
    const url = `${this.API_URL}/${page}/${pageSize}`;
    return this.http.get<NewsResponse>(url);
  }

  getCurrentNews(relativeUrl: string): Observable<NewsItem> {
    const url = `${this.API_URL}/item/${relativeUrl}`;
    return this.http.get<NewsItem>(url);
  }
}
