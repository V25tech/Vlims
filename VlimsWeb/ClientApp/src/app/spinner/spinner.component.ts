import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service'

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
    showLoader: boolean = false;

    constructor(private loaderService: SpinnerService) { }

    ngOnInit() {
        this.loaderService.isLoading.subscribe((value: boolean) => {
            this.showLoader = value;
        });
    }
}