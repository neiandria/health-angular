// src/app/components/consultas/consultas.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  UserService,
  Appointment,
  BaseUser,
} from '../../services/user.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit, OnDestroy {
  currentUser: BaseUser | null = null;
  appointments: Appointment[] = [];
  nextAppointment: Appointment | null = null;
  daysUntilNext: number | null = null;
  doctorConfirmed: boolean = false;

  private routerSub!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        if (nav.urlAfterRedirects === '/consultas') {
          this.loadData();
        }
      });

    // Carregar dados na primeira vez
    this.loadData();
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private loadData(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser || this.currentUser.accountType !== 'patient') {
      this.router.navigate(['/login']);
      return;
    }

    // Carrega e ordena consultas
    this.appointments = this.userService
      .getAppointmentsForPatient(this.currentUser.email)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    // Calcula próxima consulta futura
    const now = new Date();
    const futureAppointments = this.appointments.filter(
      (appt) => appt.date > now && appt.status === 'agendada'
    );
    this.nextAppointment = futureAppointments.length
      ? futureAppointments[0]
      : null;

    if (this.nextAppointment) {
      const diffMs = this.nextAppointment.date.getTime() - now.getTime();
      this.daysUntilNext = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      this.doctorConfirmed = this.nextAppointment.status === 'agendada';
    } else {
      this.daysUntilNext = null;
      this.doctorConfirmed = false;
    }
  }
}
