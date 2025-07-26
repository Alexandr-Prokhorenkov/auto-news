import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent {}
