export interface NewsItem {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  url: string;
  fullUrl: string;
  titleImageUrl: string;
  categoryType: string;
  text?: string
}

export interface NewsResponse {
  news: NewsItem[];
  totalCount: number;
}
