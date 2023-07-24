import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  getRequestsData(): Observable<any> {
    return this.http.get('assets/requests.json');
  }

  getPreparationsData(): Observable<any> {
    return this.http.get('assets/preparations.json');
  }

  getEffectivesData(): Observable<any> {
    return this.http.get('assets/effectives.json');
  }

}
