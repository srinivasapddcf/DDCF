import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckListComponent } from './components/check-list/check-list.component';
import { ChecklistgmnewComponent } from './components/checklistgmnew/checklistgmnew.component';
import { CommonComponent } from './components/common/common.component';

const roles = ['1003'];

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        redirectTo: 'ChecklistGM',
        pathMatch: 'full',
      },
      {
        path: 'Checklist',
        component: CheckListComponent,
      },
      {
        path: 'ChecklistGM',
        component: ChecklistgmnewComponent,
      },

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmRoutingModule { }
