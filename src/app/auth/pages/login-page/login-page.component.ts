import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private authServices: AuthServices,
    private router: Router
  ) {}

  onLogin(): void {
    this.authServices.login('fernando@gmail.com','123456')
      .subscribe( user => {
        this.router.navigate(['/']);
      })
  }
}
