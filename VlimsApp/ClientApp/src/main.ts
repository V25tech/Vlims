import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
//import { registerLicense } from '@syncfusion/ej2-base';


//registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0xwWmFZfVpgc19CY1ZSTWYuP1ZhSXxXdkFjX39ZdHdRRmVUVUA=');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
