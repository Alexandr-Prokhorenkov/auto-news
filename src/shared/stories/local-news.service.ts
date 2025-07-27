import { Injectable, computed, signal } from '@angular/core';

export type LocalNewsItem = {
  title: string;
  text: string;
  image: string;
  createdAt: string;
};

@Injectable({ providedIn: 'root' })
export class LocalNewsService {
  private readonly _news = signal<LocalNewsItem[]>(this.readFromStorage());

  readonly news = computed(() => this._news());

  add(news: LocalNewsItem): void {
    const updated = [news, ...this._news()];
    this._news.set(updated);
    localStorage.setItem('news', JSON.stringify(updated));
  }

  private readFromStorage(): LocalNewsItem[] {
    try {
      const raw = localStorage.getItem('news');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
