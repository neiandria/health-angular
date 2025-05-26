// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit() {
    const user = this.userService.getUserByCredentials(this.email, this.password);
    if (!user) {
      alert('Credenciais inválidas');
      return;
    }
    this.userService.setCurrentUser(user);
    // redireciona conforme tipo
    if (user.accountType === 'patient') {
      this.router.navigate(['/consultas']);
    } else if (user.accountType === 'doctor') {
      this.router.navigate(['/doltor/dashboard']);
    } else {
      this.router.navigate(['/recepcionista/dashboard']);
    }
  }
}
