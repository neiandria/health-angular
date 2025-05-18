import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainHeaderComponent } from '../main-header/main-header.component';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, NgIf, MainHeaderComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  formData = {
    fullName: '',
    email: '',
    accountType: '',
    gender: '',
    phone: '',
    cpf: '',
    birthDate: '',
    crm: '',
    specialty: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('As senhas não coincidem. Por favor, verifique novamente.');
      return;
    }
    // Aqui você pode fazer o envio para backend futuramente
    console.log('Formulário enviado', this.formData);
  }
}
