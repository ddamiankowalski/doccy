import { Routes } from '@angular/router';
import { Dashboard } from './routes/dashboard/dashboard';
import { Finance } from './routes/finance/finance';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Finance,
      },
    ],
  },
];
