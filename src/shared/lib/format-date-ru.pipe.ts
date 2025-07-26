import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateRu',
  standalone: true,
})
export class FormatDateRuPipe implements PipeTransform {
  transform(value: string | Date | undefined | null): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('ru-RU');
  }
}
