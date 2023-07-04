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
    Headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    token:string=null;
    constructor(private httpClient: HttpClient, private appInitializerService: AppintializorService, private cmnsvc: CommonService) {
        this.baseUrl = appInitializerService.baseUrl;
        console.log(this.baseUrl);
        this.cmnsvc.token.subscribe(p=>this.token=p);
    }

    requestOptions: any = {
        headers: new HttpHeaders(this.Headers),
        //headers:new HttpHeaders().append().append()
    };

    requestoptionswithtokenheader:any={
        headers: new HttpHeaders().append("Authorization", "Basic "  + btoa(this.token))
                .append("Content-Type", "application/x-www-form-urlencoded")
    }

    requestOptionsForUpload: any = {
        headers: new HttpHeaders()
    };

    postJsonLogin(postObject: any, url: string) {
        debugger
        return this.httpClient.post(this.baseUrl + url, postObject, this.requestOptionsForUpload)
    }

    postJson(postObject: any, url: string) {
        debugger
        let tkn = String(this.cmnsvc.token);
        return this.httpClient.post(this.baseUrl + url, postObject,{ headers: new HttpHeaders().append("Authorization", "Basic "  + btoa(this.token))
        .append("Content-Type", "application/x-www-form-urlencoded")});
    }

    postJsonP(postObject: any, url: string) {
        return this.httpClient.post(this.baseUrl + url, postObject, { headers: new HttpHeaders().append("Authorization", "Basic "  + btoa(this.token))
        .append("Content-Type", "application/x-www-form-urlencoded")});
    }

    put(postObject: any, url: string) {
        return this.httpClient.put(this.baseUrl + url, postObject, { headers: new HttpHeaders().append("Authorization", "Basic "  + btoa(this.token))
        .append("Content-Type", "application/x-www-form-urlencoded")});
    }

    delete(url: string) {
        return this.httpClient.delete(this.baseUrl + url, { headers: new HttpHeaders().append("Authorization", "Basic "  + btoa(this.token))
        .append("Content-Type", "application/x-www-form-urlencoded")});
    }

    getJson(url) {
        if (this.token != null) {
            return this.httpClient.get(this.baseUrl + url, { headers: new HttpHeaders().append("Authorization", "Basic "  + btoa(this.token))
            .append("Content-Type", "application/x-www-form-urlencoded")});
        }
        else {
            return this.httpClient.get(this.baseUrl + url, this.requestOptions);
        }
    }

    getBlob(url) {
        return this.httpClient.get(this.baseUrl + url, { responseType: 'blob' });
    }

    getJsonWithHeader(url: string, token: any) {
        this.requestOptions.headers = this.requestOptions.headers.append('token', token);
        return this.httpClient.get(this.baseUrl + url, this.requestOptions);
    }
}
