import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit() {
    const dummyAccounts = [
      { role: 'Paciente', email: 'patientexample.com', password: 'password' },
      { role: 'Médico', email: 'doctorexample.com', password: 'password' },
      { role: 'Recepcionista', email: 'receptionistexample.com', password: 'password' },
    ];

    const user = dummyAccounts.find(
      acc => acc.email === this.email && acc.password === this.password
    );

    if (user) {
      console.log(`Login bem-sucedido como ${user.role}`);
      this.router.navigate(['/consultas']);
    } else {
      alert('Credenciais inválidas. Verifique seu email e senha.');
    }
  }
}
