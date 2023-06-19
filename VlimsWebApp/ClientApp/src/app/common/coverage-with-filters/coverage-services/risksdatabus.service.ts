import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class RisksDataBusService {
    private subject = new Subject<any>();
    sendFilteredRisks(message: any) {
        this.subject.next({ data: message });
    }
    getFilteredRisks(): Observable<any> {
        return this.subject.asObservable();
    }
}
