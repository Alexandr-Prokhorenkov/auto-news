import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewsCardsListComponent } from "../../components/news-cards-list/news-cards-list.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NewsCardsListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
