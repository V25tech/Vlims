import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppintializorService {
    //types: Array<DocumentTypeConfiguration>=[];
    jsonUrls:Array<string>=[];
    baseUrl: string = "";
    documentmasterUrl:string="";
    documentmanagerUrl:string="";
    adminUrl:string="";
    configUrl = 'assets/serverconfig.json'
    constructor(private http: HttpClient) {
        
    }

    // loadServerConfig(): Promise<string[]> {
    //     debugger
    //    var jobs=  this.http.get(this.configUrl)
    //         .toPromise()
    //         .then((data: any) => 
    //         {
    //             debugger
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
        debugger
        this.getConfig()
          .subscribe((data: any) => {
            debugger
            this.jsonUrls=data;
            this.documentmasterUrl=data.documentmasterUrl;
            this.documentmanagerUrl=data.documentmanagerUrl;
            this.adminUrl=data.adminUrl;
          }
          );
      }
}

export function serverConfigInitializerFactory(startupService: AppintializorService): Function {
    debugger
    return () => startupService.loadServerConfig();
    
}
