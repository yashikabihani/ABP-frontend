import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user-model';
import { LoginService } from '../services/login.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({opacity: 1, transform: 'scale(1.0)'})),
      state('false', style({opacity: 0, transform: 'scale(0.0)'})),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  currentUser: User = {email: '', password: ''};
  isLoading = false;
  isVisible: true;
   

  constructor(private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private loginService: LoginService) {
  }

  ngOnInit() {
    setTimeout(() => this.scrollTop(),);
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   this.router.navigate(['/dashboard']);

  // }

  public signUp() {
    this.router.navigate(['/signUp']);
  }

   public login() {
     this.startLoading();
     this.authService.logIn(this.currentUser.email, this.currentUser.password).then((data) => {
       this.loginService.setUser(data.user);
       this.stopLoading();
       this.snackBar.open('Login Successful!', '', {duration: 2000});
       this.onSuccessfulLogIn()

     }).catch(e => {
       this.stopLoading();
       console.log('Catches object set:' + e.message);
       this.snackBar.open(e.message, 'ok', {duration: 4000});
     })
   }

  onSuccessfulLogIn() {
    this.router.navigate(['/dashboard']);
  }

   startLoading() {
     this.isLoading = true;
   }

   stopLoading() {
     this.isLoading = false;
   }

   toggleLogin() {
     this.isVisible = true;
     setTimeout(() => this.scrollToLogin(),);
   }

  scrollToLogin() {
    const element = document.getElementById('target');
    element.scrollIntoView();
  }

   checkLogin(value: any, valid: any, form: any) {
     if (valid) {
       this.login();
     }
   }

  scrollTop() {
    const element = document.getElementById('content');
    element.scrollIntoView();
  }

}
