// src/app/components/main-header/main-header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService, BaseUser } from '../../services/user.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // ← aqui
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  currentUser: BaseUser | null = null;
  dropdownOpen = false;
  private sub!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // recebe imediatamente o usuário (null inicialmente) e futuras alterações
    this.sub = this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.userService.setCurrentUser(null);
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
