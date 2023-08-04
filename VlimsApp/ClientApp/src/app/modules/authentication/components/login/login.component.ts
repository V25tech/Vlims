import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
import { RequestContext, UserConfiguration } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  lstusers:UserConfiguration[]=[];
  username: string = '';
  password: string = '';
  constructor(private router: Router,private loginService: LoginService,private userssvc:UsersconfigurationService,
   private loader:NgxSpinnerService ) {}

   ngOnInit(){
    this.getusers();
   }

  login() {
    // if (this.username == 'admin' && this.password == 'admin') {
    //   localStorage.setItem('username', 'admin');
    //   this.router.navigate(['/documents']);
    // }
    if(this.loginService.login(this.username, this.password,this.lstusers)){
      this.loginSuccess.emit();
      this.router.navigate(['/documents']);
    }
  }
  getusers(){
    debugger
    this.loader.show();
    let objrequest: RequestContext={PageNumber:1,PageSize:50,Id:0};
      return this.userssvc.getusers(objrequest).subscribe((data:any)=>{
        this.lstusers=data.Response;
        this.loader.hide();
      });
  }
}
