import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  @Output() private clicked = new EventEmitter<void>();

  public onClick() {
    this.clicked.emit();
  }
}
