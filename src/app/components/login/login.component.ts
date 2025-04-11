import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../../environment/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService) {}

  public login() {
    if (this.email == '' || this.password == '') {
      alert('Please enter valid email and password');
      return;
    }
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  public signInWithGoogle(){
    this.authService.googleSignIn()
  }
}
