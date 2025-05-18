import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  onSubmit() {
    // Aqui você pode chamar um serviço de autenticação real
    console.log('Tentativa de login:', { email: this.email, password: this.password });
    alert('logou');
  }
}
