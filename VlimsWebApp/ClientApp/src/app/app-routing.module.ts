
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './core/notfound/notfound.component';


const routes : Routes=[ 
  { path: '', redirectTo: 'DocumentConfig', pathMatch: 'full' },{path:'BuildProductModel', loadChildren:'../app/BuildProductModel/BuildProductModel.module#BuildProductModelModule'},
  {path:'DocumentConfig', loadChildren:'../app/DocumentConfiguration/DocumentConfiguration.module#DocumentConfigurationModule'},
  {path:'DocumentTemplateConfig', loadChildren:'../app/DocumentTemplateConfiguration/DocumentTemplateConfiguration.module#DocumentTemplateConfigurationModule'},
  {path:'DashboardConfig', loadChildren:'../app/DashboardConfiguration/DashboardConfiguration.module#DashboardConfigurationModule'},
  {path:'NotificationConfig', loadChildren:'../app/NotificationConfiguration/NotificationConfiguration.module#NotificationConfigurationModule'},
  {path:'Workflow', loadChildren:'../app/WorkflowConfiguration/WorkflowConfiguration.module#WorkflowConfigurationModule'},
  {path:'adddocumentconfig', loadChildren:'../app/AddDocumentConfiguration/AddDocumentConfiguration.module#AddDocumentConfigurationModule'},
  {path:'launch', loadChildren:'../app/Launch/Launch.module#LaunchModule'},
  {path: '**', component: NotfoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
            scrollPositionRestoration: "top"
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
