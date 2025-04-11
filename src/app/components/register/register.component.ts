import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth-service/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService) {}

  public register(){
    if (this.email == '' || this.password == '') {
      alert('Please enter valid email and password');
      return;
    }
    this.authService.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
