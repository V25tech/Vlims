import { Component, OnInit } from '@angular/core';
import { RetailerService} from '../Services/retailer.service';
import {Retailer} from '../model/Retailer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
objnew:Retailer;
  constructor(private toastr: ToastrService, private retailersvc:RetailerService,private router:Router) { 
    this.objnew=new Retailer();
  }

  ngOnInit() {
  }

  register(objn:Retailer)
  {
    this.retailersvc.addretailer(objn).subscribe((data:any)=>{
      if(data>0)
      {
        this.toastr.success('Registration Successfully');
        this.router.navigateByUrl('/');
      }
      else
      {
        this.toastr.error('already exists');
      }
    })
    // console.log(objn);
    // this.router.navigateByUrl('/');
  }

}
