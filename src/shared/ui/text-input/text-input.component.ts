import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';

  value = '';
  disabled = false;

  // Коллбэки от Angular forms API
  private onChange = (value: string) => {};
  private onTouched = () => {};

  // Вызывается Angular при изменении значения извне
  writeValue(value: string): void {
    this.value = value;
  }

  // Регистрирует коллбэк на изменение
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Регистрирует коллбэк на "потерю фокуса"
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Управление состоянием disabled
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Обработка ввода
  handleInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
  }

  // Обработка blur
  handleBlur(): void {
    this.onTouched();
  }
}
