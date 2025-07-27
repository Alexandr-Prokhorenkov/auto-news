import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../shared/api/services/news.service';
import { NewsItem } from '../../shared/types/news.interface';
import { map } from 'rxjs';
import { NewsCardComponent } from '../news-card/news-card.component';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { FormatDateRuPipe } from '../../shared/lib/format-date-ru.pipe';
import { LocalNewsService } from '../../shared/stories/local-news.service';

@Component({
  selector: 'app-news-cards-list',
  standalone: true,
  imports: [
    CommonModule,
    NewsCardComponent,
    SpinnerComponent,
    FormatDateRuPipe,
  ],
  templateUrl: './news-cards-list.component.html',
  styleUrl: './news-cards-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCardsListComponent implements OnInit, AfterViewInit {
  private localNewsService = inject(LocalNewsService);
  readonly localNews = this.localNewsService.news;
  private readonly newsService = inject(NewsService);
  readonly newsList = signal<NewsItem[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  private page = 1;

  @ViewChild('loadTrigger', { static: false }) loadTriggerRef!: ElementRef;

  ngOnInit(): void {
    this.fetchNews();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.isLoading()) {
          this.page++;
          this.fetchNews();
        }
      },
      {
        rootMargin: '200px',
      }
    );

    observer.observe(this.loadTriggerRef.nativeElement);
  }

  private fetchNews(): void {
    this.isLoading.set(true);

    this.newsService
      .getNews(this.page, 10)
      .pipe(
        map((res) =>
          res.news.filter(
            (item) =>
              item.categoryType.trim().toLowerCase() === 'автомобильные новости'
          )
        )
      )
      .subscribe({
        next: (filteredNews) => {
          const current = this.newsList();
          this.newsList.set([...current, ...filteredNews]);
          this.error.set(null);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Ошибка при загрузке новостей');
          this.isLoading.set(false);
        },
      });
  }

  getImageUrl(file: File | { name: string }): string {
    return file instanceof File ? URL.createObjectURL(file) : '';
  }
}
