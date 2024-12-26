import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/errorPages/page-not-found/page-not-found.component';
 
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.loginModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.sharedModule),
  },
  {
    path: 'mentorModule',
    loadChildren: () =>
      import('./mentorModule/mentor.module').then((m) => m.MentorModule),
  },
  {
    path: 'mdss',
    loadChildren: () =>
      import('./mdssModule/mdss.module').then((m) => m.MdssModule),
  },
  {
    path: 'loanModule',
    loadChildren: () =>
      import('./loanModule/loanmodule.module').then((m) => m.LoanmoduleModule),
  },

  {
    path: 'bankModule',
    loadChildren: () =>
      import('./bankModule/bank-module.module').then((m) => m.BankModuleModule),
  },
  {
    path: 'farmer',
    loadChildren: () =>
      import('./FarmerModule/farmer.module').then((m) => m.FarmerModule),
  },
  {
    path: 'technician',
    loadChildren: () =>
      import('./technicianModule/technician.module').then(
        (m) => m.TechnicianModuleModule
      ),
  },
  {
    path: 'jcModule',
    loadChildren: () =>
      import('./jcModule/jc-module.module').then((m) => m.JcModuleModule),
  },
  {
    path: 'dcModule',
    loadChildren: () =>
      import('./dcModule/dc-module.module').then((m) => m.DcModuleModule),
  },
  {
    path: 'ahModule',
    loadChildren: () =>
      import('./ahModule/ah-module.module').then((m) => m.AhModuleModule),
  },
  {
    path: 'SecAssModule',
    loadChildren: () =>
      import('./secAssModule/sec-ass.module').then((m) => m.SecAssModule),
  },
  {
    path: 'districtModule',
    loadChildren: () =>
      import('./districtModule/district-module.module').then(
        (m) => m.DistrictModuleModule
      ),
  },

  {
    path: 'officeModule',
    loadChildren: () =>
      import('./office-module/office-module.module').then(
        (m) => m.OfficeModuleModule
      ),
  },

  {
    path: 'districtHOModule',
    loadChildren: () =>
      import('./districtHOModule/district-ho.module').then(
        (m) => m.DistrictHOModule
      ),
  },
  {
    path: 'collectorModule',
    loadChildren: () =>
      import('./collectorModule/collector.module').then(
        (m) => m.CollectorModule
      ),
  },
  {
    path: 'dlcoModule',
    loadChildren: () =>
      import('./dlcoModule/dlco.module').then((m) => m.DlcoModule),
  },
  {
    path: 'dcoModule',
    loadChildren: () =>
      import('./dcoModule/dco.module').then((m) => m.DcoModule),
  },
  {
    path: 'gmModule',
    loadChildren: () => import('./gmModule/gm.module').then((m) => m.GmModule),
  },
  {
    path: 'commissionerModule',
    loadChildren: () =>
      import('./commissionerModule/commissioner-module.module').then(
        (m) => m.CommissionerModuleModule
      ),
  },

  {
    path: 'Notifications',
    loadChildren: () =>
      import('./notification/notification-routing.module').then(
        (m) => m.NotificationRoutingModule
      ),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
   

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
 
})
export class AppRoutingModule {}
