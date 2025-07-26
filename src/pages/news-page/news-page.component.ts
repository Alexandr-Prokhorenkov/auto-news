import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsItem } from '../../shared/types/news.interface';
import { NewsService } from '../../shared/api/services/news.service';
import { FormatDateRuPipe } from "../../shared/lib/format-date-ru.pipe";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [FormatDateRuPipe],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly newsService = inject(NewsService);
  private sanitizer = inject(DomSanitizer);
  readonly safeHtml = signal<SafeHtml | null>(null);
  public url = this.route.snapshot.queryParamMap.get('Url');
  readonly currentNewsDate = signal<NewsItem | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  

  ngOnInit(): void {
    this.fetchCurrentNews(this.url);
  }

  private fetchCurrentNews(relativeUrl: string | null): void {
    if (!relativeUrl) {
      this.error.set('Параметр Url отсутствует');
      return;
    }

    this.isLoading.set(true);

    this.newsService.getCurrentNews(relativeUrl).subscribe({
      next: (news) => {
        this.currentNewsDate.set(news);
        this.safeHtml.set(this.sanitizer.bypassSecurityTrustHtml(news.text ?? ''));
        this.isLoading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Не удалось загрузить новость');
        this.isLoading.set(false);
      },
    });
  }
}
