import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddButtonComponent } from "../../shared/ui/add-button/add-button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, AddButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
