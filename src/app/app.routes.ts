import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: SignInComponent },
  { path: 'login', component: LoginComponent },
];
