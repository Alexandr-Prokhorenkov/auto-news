import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormatDateRuPipe } from '../../shared/lib/format-date-ru.pipe';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormatDateRuPipe],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCardComponent {
  @Input() public titleImageUrl!: string;
  @Input() public publishedDate!: string;
  @Input() public title!: string;
  @Input() public id!: number;
  @Input() public Url!: string;
}
