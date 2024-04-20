import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/modules/authentication/services/login.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: string = 'admin';
  searchTerm: any = null;
  constructor(private loginservice: LoginService, private router: Router,
    private toaster: ToastrService,
    private commonsvc: CommonService, private activate: ActivatedRoute) {    
  }
  logout(){
    this.loginservice.logout();
    this.router.navigate(['/login']);
  }
  change(){
    if(this.commonsvc.getUsername()!='admin'){
    this.router.navigate(['/admin/change']);
    } else{
      this.toaster.error('admin password change restricted');
    }
  }
  ngOnInit(): void {
    const user=localStorage.getItem("username");
    if(user!=null && user!=undefined)
    {
      this.user=user;
    }
  }
  onSearch() {
    this.router.navigate(['/search-results'], { state: this.searchTerm });
  }
}
