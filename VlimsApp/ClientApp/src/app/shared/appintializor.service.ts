import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';


@Injectable()
export class AppintializorService {
    //types: Array<DocumentTypeConfiguration>=[];
    jsonUrls:Array<string>=[];
    baseUrl: string = "";
  //  documentmasterUrl: string = "https://dmsdocmasterv2.azurewebsites.net/";
  //  documentmanagerUrl: string = "https://dmsdocmanagerv2.azurewebsites.net/";
  //  adminUrl: string = "https://dmsadminv2.azurewebsites.net/";


  documentmasterUrl: string = "https://vlimsdocmaster.azurewebsites.net/";
  documentmanagerUrl: string = "https://vlimsdocmanager.azurewebsites.net/";
  adminUrl: string = "https://dmsadmin1.azurewebsites.net/";

    configUrl = 'assets/serverconfig.json'
    constructor(private http: HttpClient) {
        
    }

    // loadServerConfig(): Promise<string[]> {
    //     
    //    var jobs=  this.http.get(this.configUrl)
    //         .toPromise()
    //         .then((data: any) => 
    //         {
    //             
    //         this.baseUrl = data.BaseUrl;
    //         this.documentmasterUrl= data.documentmasterUrl;
    //         this.documentmanagerUrl= data.documentmanagerUrl;
    //         this.adminUrl= data.adminUrl;
    //         return jobs;
    //         }
    //         )
    //         .catch(err => console.log("Server configuration not found."));
    //         return jobs;
    // }
    loadServerConfig(): Promise<string> {
        this.showConfig();
        return this.http.get(this.configUrl)
            .toPromise()
            .then((data: any) => this.baseUrl = data.BaseUrl)
            .catch(err => console.log("Server configuration not found."));
    }
    getConfig() {
        return this.http.get(this.configUrl);
      }
    showConfig() {
        
        this.getConfig()
          .subscribe((data: any) => {
            
            this.jsonUrls=data;
            this.documentmasterUrl=data.documentmasterUrl;
            this.documentmanagerUrl=data.documentmanagerUrl;
            this.adminUrl=data.adminUrl;
          }
          );
      }
}

export function serverConfigInitializerFactory(startupService: AppintializorService): Function {
    
    return () => startupService.loadServerConfig();
    
}
