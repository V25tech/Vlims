import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class SpinnerService {
    private loadCount: number = 0;
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    show() {
        if (this.loadCount == 0) {
            this.isLoading.next(true);
        }
        this.loadCount++;
    }

    hide() {
        if (this.loadCount > 0) {
            this.loadCount--;
        }
        else {
            this.loadCount = 0;
        }
        if (this.loadCount == 0) {
            this.isLoading.next(false);
        }
    }

    hideAll() {
        this.loadCount = 0;
        this.isLoading.next(false);
    }
}