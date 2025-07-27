import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddButtonComponent } from '../../shared/ui/add-button/add-button.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { TextInputComponent } from '../../shared/ui/text-input/text-input.component';
import { TextAreaComponent } from '../../shared/ui/text-area/text-area.component';
import { ImageUploadComponent } from '../../shared/ui/image-upload/image-upload.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalNewsService } from '../../shared/stories/local-news.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AddButtonComponent,
    ModalComponent,
    TextInputComponent,
    TextAreaComponent,
    ImageUploadComponent,
    ButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly isModalOpen = signal(false);
  private localNewsService = inject(LocalNewsService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    image: [null, Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const reader = new FileReader();
    const file = this.form.value.image;

    reader.onload = () => {
      const base64Image = reader.result as string;

      const newNews = {
        title: this.form.value.title,
        text: this.form.value.text,
        image: base64Image,
        createdAt: new Date().toISOString(),
      };

      this.localNewsService.add(newNews);
      this.closeModal();
    };

    reader.readAsDataURL(file);
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.form.reset();
  }
  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get textControl(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get imageControl(): FormControl {
    return this.form.get('image') as FormControl;
  }
}
