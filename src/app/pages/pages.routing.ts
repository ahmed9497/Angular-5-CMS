import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import {BlankComponent} from "./blank/blank.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InspectionChartComponent} from "./inspection-chart/inspection-chart.component";
import {InspeccionComponent} from "./inspeccion/inspeccion.component";

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank' } },
            { path: 'inspeccion', component: InspeccionComponent, data: { breadcrumb: 'Inspeccion' } },
            { path: 'chart', component: InspectionChartComponent, data: { breadcrumb: 'chart' } }
       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);