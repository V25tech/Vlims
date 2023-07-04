import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppintializorService {
    baseUrl: string = "";
    configUrl = 'assets/serverconfig.json'
    constructor(private http: HttpClient) {
        
    }

    loadServerConfig(): Promise<string> {
        return this.http.get(this.configUrl)
            .toPromise()
            .then((data: any) => this.baseUrl = data.BaseUrl)
            .catch(err => console.log("Server configuration not found."));
    }
}

export function serverConfigInitializerFactory(startupService: AppintializorService): Function {
    return () => startupService.loadServerConfig();
}
