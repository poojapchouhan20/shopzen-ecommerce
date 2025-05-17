import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

 userEmail: string = '';

constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
      console.log('Decoded user info from token:', user);
  if (!user) {
    this.router.navigate(['/login']);
  } else {
    this.userEmail = user.sub || user.email || user.username || '';
  }
  }

  logout(): void {
    this.authService.logout();
  this.router.navigate(['/login']);
  }
}
