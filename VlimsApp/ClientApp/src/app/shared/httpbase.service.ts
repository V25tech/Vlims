import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppintializorService } from '../shared/appintializor.service'
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class HttpbaseService {

    baseUrl: any
    documentmasterUrl: any
    documentmanagerUrl: any
    adminUrl: any
    Headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    token: string = '';
    constructor(private httpClient: HttpClient, private appInitializerService: AppintializorService, private cmnsvc: CommonService) {
        this.baseUrl = appInitializerService.baseUrl;
        this.documentmasterUrl = appInitializerService.documentmasterUrl;
        this.documentmanagerUrl = appInitializerService.documentmanagerUrl;
        this.adminUrl = appInitializerService.adminUrl;
        console.log(this.baseUrl);
        this.cmnsvc.token.subscribe(p => this.token = p);
    }

    requestOptions: any = {
        headers: new HttpHeaders(this.Headers),
        //headers:new HttpHeaders().append().append()
    };

    requestoptionswithtokenheader: any = {
        headers: new HttpHeaders().append("Authorization", "Basic " + btoa(this.token))
            .append("Content-Type", "application/x-www-form-urlencoded")
    }

    requestOptionsForUpload: any = {
        headers: new HttpHeaders()
    };

    geturl(type: string) {
        switch (type) {
            case "master": //code block statement1;
                return this.documentmasterUrl;
                break;
            case "manager": //code block statement2;
                return this.documentmanagerUrl;
                break;
            case "admin": //code block statement3;
                return this.adminUrl;
                break;
            default:
            //default block statement;
        }
    }
    postJsonLogin(postObject: any, url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        return this.httpClient.post(this.baseUrl + url, postObject, this.requestOptionsForUpload)
    }

    postJsonWithToken(postObject: any, url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('tokenX')
        });
        return this.httpClient.post(this.baseUrl + url, postObject, { headers: reqHeader })
    }

    postJson(postObject: any, url: string, type: string | null = null) {

        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        let tkn = String(this.cmnsvc.token);
        return this.httpClient.post(this.baseUrl + url, postObject, {
            headers: new HttpHeaders().append("Authorization", "Basic " + btoa(this.token))
                .append("Content-Type", "application/x-www-form-urlencoded")
        });
    }

    postJsonP(postObject: any, url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        return this.httpClient.post(this.baseUrl + url, postObject, {
            headers: new HttpHeaders().append("Authorization", "Basic " + btoa(this.token))
                .append("Content-Type", "application/x-www-form-urlencoded")
        });
    }

    put(postObject: any, url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        return this.httpClient.put(this.baseUrl + url, postObject, {
            headers: new HttpHeaders().append("Authorization", "Basic " + btoa(this.token))
                .append("Content-Type", "application/x-www-form-urlencoded")
        });
    }

    delete(url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        return this.httpClient.delete(this.baseUrl + url, {
            headers: new HttpHeaders().append("Authorization", "Basic " + btoa(this.token))
                .append("Content-Type", "application/x-www-form-urlencoded")
        });
    }

    getJson(url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        if (this.token != null) {
            return this.httpClient.get(this.baseUrl + url, {
                headers: new HttpHeaders().append("Authorization", "Basic " + btoa(this.token))
                    .append("Content-Type", "application/x-www-form-urlencoded")
            });
        }
        else {
            return this.httpClient.get(this.baseUrl + url, this.requestOptions);
        }
    }

    getBlob(url: string, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        return this.httpClient.get(this.baseUrl + url, { responseType: 'blob' });
    }

    getJsonWithHeader(url: string, token: any, type: string | null = null) {
        if (type != null) {
            this.baseUrl = this.geturl(type);
        }
        this.requestOptions.headers = this.requestOptions.headers.append('token', token);
        return this.httpClient.get(this.baseUrl + url, this.requestOptions);
    }
    getwithheader(url: string, type: string | null = null) {

        if (type != null) {
            this.baseUrl = this.geturl(type);

        }
        return this.httpClient.get(this.baseUrl + url, this.requestOptions);
    }
}
