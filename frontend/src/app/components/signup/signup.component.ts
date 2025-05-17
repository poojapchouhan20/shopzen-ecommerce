import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username = '';
  password = '';
  successMsg = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

 signup() {
  const authRequest = {
    username: this.username,
    password: this.password
  };

  this.authService.signup(authRequest).subscribe({
    next: (res) => {
      console.log('Signup response:', res);  // should print the response
      this.successMsg = typeof res.message === 'string' ? res.message : JSON.stringify(res.message);
      this.errorMsg = '';
      // this.router.navigate(['/login']);
    },
    error: (err) => {
      console.log('Signup error:', err);  // log error object
      this.errorMsg = err.error?.message || err.error || 'Signup failed. Try another username.';
      this.successMsg = '';
    }
  });
}
}