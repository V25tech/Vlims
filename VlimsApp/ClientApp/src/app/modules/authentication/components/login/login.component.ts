import { Component, ElementRef, EventEmitter, Output,Renderer2 ,ViewChild  } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
import { RequestContext, UserConfiguration, functionalprofile } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SetfunctionalprofileComponent } from '../set-functional-profile/setfunctionalprofile.component';
import { setfunctionalprofileconfigurationservice } from 'src/app/modules/services/setfunctionalprofile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  lstusers:UserConfiguration[]=[];
  roles:functionalprofile[]=[];
  username: string = '';
  password: string = '';
  constructor(private router: Router,private loginService: LoginService,private userssvc:UsersconfigurationService,
    private toastr:ToastrService,
    private renderer: Renderer2,
    private setfunctionalsvc:setfunctionalprofileconfigurationservice,
   private loader:NgxSpinnerService,private commonsvc:CommonService ) {}

   ngOnInit(){
    this.getusers();
    this.getsetfunctionalprofile();
   }
   ngAfterViewInit() {
    // Set focus on the input element when the view is initialized
    this.renderer.selectRootElement(this.usernameInput.nativeElement).focus();
  }
  login() {
    // if (this.username == 'admin' && this.password == 'admin') {
    //   localStorage.setItem('username', 'admin');
    //   this.router.navigate(['/documents']);
    // }
    debugger
    if(this.loginService.login(this.username, this.password,this.lstusers,this.roles)){
      localStorage.setItem("username", this.username);
      this.commonsvc.setUsername(this.username);
      this.commonsvc.createdBy=this.username;
      this.loginSuccess.emit();
      this.router.navigate(['/documents']);
      this.toastr.success('Welcome '+this.username, 'Success', {
        timeOut: 1000, // Set the display time in milliseconds (3 seconds)
      });
    }
    else{
      this.toastr.error('login failed');
        }
  }
  getusers(){
    debugger
    this.loader.show();
    let objrequest=new RequestContext();
    objrequest.PageNumber=1;objrequest.PageSize=50;
      return this.userssvc.getusers(objrequest).subscribe((data:any)=>{
        this.lstusers=data.Response;
        this.loader.hide();
      });
  }
  getsetfunctionalprofile() {
       return this.setfunctionalsvc.getsetfunctionalprofileconfiguration(this.commonsvc.req).subscribe((data: any) => {
         debugger
         this.roles = data.Response;
       });
      }
}
