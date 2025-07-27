import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
  computed,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
})
export class ImageUploadComponent implements ControlValueAccessor {
  @Output() imageSelected = new EventEmitter<File | null>();

  private _file = signal<File | null>(null);
  readonly previewUrl = computed(() =>
    this._file() ? URL.createObjectURL(this._file()!) : null
  );

  isDragOver = false;

  private onChange: (value: File | null) => void = () => {};
  private onTouched: () => void = () => {};
  private isDisabled = false;

  writeValue(value: File | null): void {
    this._file.set(value);
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this._file.set(file);
      this.onChange(file);
      this.imageSelected.emit(file);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this._file.set(file);
      this.onChange(file);
      this.imageSelected.emit(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  triggerFileInput(input: HTMLInputElement): void {
    if (!this.isDisabled) input.click();
  }

  removeImage(): void {
    this._file.set(null);
    this.onChange(null);
    this.imageSelected.emit(null);
  }

  hasFile(): boolean {
    return this._file() !== null;
  }
}
