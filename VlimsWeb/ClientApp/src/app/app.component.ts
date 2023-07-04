import { Component } from '@angular/core';
import { RetailerService } from './Services/retailer.service'
import { CommonService } from './shared/common.service'
import { AppintializorService } from './shared/appintializor.service'
import { Retailer } from './model/Retailer'
import { HttpbaseService } from './shared/httpbase.service'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    name = 'Angular';
    objretailer: Retailer 
    baseurl:any;

    constructor(private retailerservice: RetailerService, private commonservice: CommonService, private appini: AppintializorService, private httpsvc: HttpbaseService)
    {        
    }

    ngOnInit()
    {
        
        // this.appini.loadServerConfig().then((data: any) => {
        //     this.appini.baseUrl = data.BaseUrl;
        //     this.httpsvc.baseUrl = data.BaseUrl;
        //     localStorage.setItem('baseurl', JSON.stringify(this.appini.baseUrl));
        //     //this.getretailer();
        // });
    }

    // getretailer()
    // {
    //     this.retailerservice.getretailer().subscribe((data: any) => {
    //         this.objretailer = data;
    //         if (this.objretailer != null)
    //             this.commonservice.setRetailer(this.objretailer);
    //     });
    // }

}
