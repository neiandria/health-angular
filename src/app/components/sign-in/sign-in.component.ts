import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  imports: [FormsModule, NgIf],
})
export class SignInComponent {
  formData: any = {
    accountType: '',
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.addUser(this.formData);
    console.log(this.formData);
    console.log('Usuário cadastrado com sucesso!');
    this.formData = { accountType: '' };
  }
}
