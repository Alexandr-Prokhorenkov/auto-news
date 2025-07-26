import { Routes } from '@angular/router';
import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { MainPageComponent } from '../pages/main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: MainPageComponent },
      {
        path: 'news/:id',
        loadComponent: () =>
          import('../pages/news-page/news-page.component').then(
            (m) => m.NewsPageComponent
          ),
      },
    ],
  },
];
