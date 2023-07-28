import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  username: string = '';
  password: string = '';
  constructor(private router: Router,private loginService: LoginService) {}

  login() {
    // if (this.username == 'admin' && this.password == 'admin') {
    //   localStorage.setItem('username', 'admin');
    //   this.router.navigate(['/documents']);
    // }
    if(this.loginService.login(this.username, this.password)){
      this.loginSuccess.emit();
      this.router.navigate(['/documents']);
    }
  }
}
