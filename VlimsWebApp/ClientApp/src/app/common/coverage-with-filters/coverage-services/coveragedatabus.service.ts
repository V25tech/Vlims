import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CoverageDataBusService {
    private subject = new Subject<any>();
    sendCoverages(message?: any) { 
        this.subject.next({ data: message });
    }
    getCoverages(): Observable<any> {
        return this.subject.asObservable();
    }
}
