import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsersconfigurationService } from 'src/app/modules/services/usersconfiguration.service';
import { RequestContext, UserConfiguration, functionalprofile } from 'src/app/models/model';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { SetfunctionalprofileComponent } from '../set-functional-profile/setfunctionalprofile.component';
import { setfunctionalprofileconfigurationservice } from 'src/app/modules/services/setfunctionalprofile.service';
import { rtlMode } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
//const AUTH_STORAGE_KEY = 'isLoggedIn';
export class LoginComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  lstusers: UserConfiguration[] = [];
  user: UserConfiguration = new UserConfiguration();
  roles: functionalprofile[] = [];
  username: string = '';
  password: string = '';
  constructor(private router: Router, private loginService: LoginService, private userssvc: UsersconfigurationService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private setfunctionalsvc: setfunctionalprofileconfigurationservice,
    private usersvc: UsersconfigurationService,
    private loader: NgxSpinnerService, private commonsvc: CommonService) { }

  ngOnInit() {
    //this.getusers();
    this.getsetfunctionalprofile();
    this.checkadminuser();
  }
  checkadminuser() {
    this.loader.show();
    //check admin user exists or not
    //if admin user not exist then create with default password
    const admin = new UserConfiguration();
    admin.UserID = "Admin";
    this.userssvc.login(admin).subscribe((data: any) => {

      this.user = data;
      console.log('admin', this.user);
      this.loginService.updateuser(this.roles, this.user);
      this.isvaliduser();
      this.loader.hide();
    }, (error: any) => {
      //create admin user
      this.createadminuser(this.user);
    });
  }
  createadminuser(user: UserConfiguration) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {
    // Set focus on the input element when the view is initialized
    this.renderer.selectRootElement(this.usernameInput.nativeElement).focus();
  }
  login() {

    this.loader.show();
    this.userssvc.login(this.user).subscribe((data: any) => { 

      this.userssvc.loginForToken({'Username':'rst','Password':'rst'}).subscribe((res: any) =>{

        console.log(res);
        localStorage.setItem('tokenX',res.Response[0]);
      })

      this.user = data;
      this.commonsvc.setUser(this.user);
      if (this.user.UserID.toLowerCase() === "admin") {

        this.loginService.updateuser(this.roles, this.user);
        this.commonsvc.setadminroles();
      }
      else {
        this.loginService.updateuser(this.roles, this.user);
      }
      this.isvaliduser();
    }, (error: any) => {
      this.loader.hide();
      this.toastr.error('login failed');
    });
    //}

  }
  isvaliduser() {

    localStorage.setItem("username", this.user.UserID);
    //this.commonsvc.userEntityPermissions$.next(localStorage.getItem("roles"));
    this.commonsvc.setUsername(this.user.UserID);
    this.commonsvc.createdBy = this.user.UserID;
    this.loader.hide();
    this.loginSuccess.emit();

    if (this.user.Password === 'Passw0rd' && this.user.UserID.toLowerCase() !== 'admin') {
      // Executes if the password is 'Passw0rd' and the user ID is not 'admin'
      this.commonsvc.setsidebardisabled(true);
      this.router.navigate(['/admin/change']);
      // this.commonsvc.issidebardisabled=true;
    } else {
      // Executes if the condition above is not met
      this.commonsvc.setsidebardisabled(false);
      this.commonsvc.getsidebardisabled();
      this.router.navigate(['/documents']);
    }
    this.commonsvc.startSessionTimeout(30);
    console.log('mddd', this.user.ModifiedDate);


    let coutDownDays = this.compareDateWithToday(this.user.ModifiedDate, 60);
    if (coutDownDays < 7) {
      const toastrConfig: Partial<IndividualConfig> = {
        tapToDismiss: false, // Prevent automatic dismissal
        closeButton: true // Optionally, show the close button
      };
      
      this.toastr.warning(`Your password will expire in ${coutDownDays} days`, 'Password Expiry', toastrConfig);
    }
    else {
      this.toastr.success('Welcome ' + this.user.UserID, 'Login Success', {
        timeOut: 1000, // Set the display time in milliseconds (3 seconds)
      });
    }
  }
  getusers() {

    this.loader.show();
    let objrequest = new RequestContext();
    objrequest.PageNumber = 1; objrequest.PageSize = 50;
    return this.userssvc.getusers(objrequest).subscribe((data: any) => {
      this.lstusers = data.Response;
      this.loader.hide();
    });
  }
  getsetfunctionalprofile() {
    this.loader.show();
    return this.setfunctionalsvc.getsetfunctionalprofileconfiguration(this.commonsvc.req).subscribe((data: any) => {
      this.roles = data.Response;
      this.loader.hide();
    });
  }

  compareDateWithToday(targetDate: Date | undefined, daysToAdd: number): number {

    if (targetDate == undefined)
      return 0;

    const today = new Date();
    const calculatedDate = new Date(targetDate);
    calculatedDate.setDate(calculatedDate.getDate() + daysToAdd);

    // Calculate the difference in days
    const differenceInTime = calculatedDate.getTime() - today.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  }
}
