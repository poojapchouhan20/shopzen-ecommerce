import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  this.authService.login({ username: this.username, password: this.password })
    .subscribe({
      next: (res) => {
        if (res && res.token) {
          this.authService.saveToken(res.token);
          this.router.navigate(['/products']);
        } else {
          this.errorMsg = 'Invalid response from server';
        }
      },
      error: () => {
        this.errorMsg = 'Invalid credentials';
      }
    });
}
}