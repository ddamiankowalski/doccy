import { Routes } from '@angular/router';
import { Dashboard } from './routes/dashboard/dashboard';
import { Finance } from './routes/finance/finance';
import { Tasks } from './routes/tasks/tasks';
import { Documents } from './routes/documents/documents';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'finance',
        component: Finance,
      },
      {
        path: 'tasks',
        component: Tasks,
      },
      {
        path: 'documents',
        component: Documents,
      },
    ],
  },
];
