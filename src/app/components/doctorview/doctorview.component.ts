// src/app/components/doctor/doctor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  UserService,
  Appointment,
  BaseUser,
} from '../../services/user.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctorview.component.html',
  styleUrls: ['./doctorview.component.css'],
})
export class DoctorviewComponent implements OnInit {
  currentUser: BaseUser | null = null;
  appointments: Array<{ patient: BaseUser; appt: Appointment }> = [];

  // Estatísticas
  todayCount = 0;
  tomorrowCount = 0;
  weekCount = 0;
  totalPatients = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser || this.currentUser.accountType !== 'doctor') {
      this.router.navigate(['/login']);
      return;
    }

    // Carrega consultas do médico
    this.appointments = this.userService.getAppointmentsForDoctor(
      this.currentUser.fullName
    );

    const now = new Date();
    const today = now.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now).setDate(new Date(now).getDate() + 1);
    const weekAhead = new Date(now).setDate(new Date(now).getDate() + 7);

    // Calcula estatísticas
    this.todayCount = this.appointments.filter(({ appt }) => {
      const d = appt.date.setHours(0, 0, 0, 0);
      return d === today;
    }).length;

    this.tomorrowCount = this.appointments.filter(({ appt }) => {
      const d = appt.date.setHours(0, 0, 0, 0);
      return d === new Date(tomorrow).setHours(0, 0, 0, 0);
    }).length;

    this.weekCount = this.appointments.filter(
      ({ appt }) =>
        appt.date.getTime() <= weekAhead && appt.date.getTime() >= today
    ).length;

    // Total pacientes únicos
    const unique = new Set(
      this.appointments.map(({ patient }) => patient.email)
    );
    this.totalPatients = unique.size;
  }

  statusFilter: string = '';
  dateFilter: string = '';

  get filteredAppointments() {
    return this.appointments.filter(({ appt }) => {
      const statusMatch =
        !this.statusFilter || appt.status === this.statusFilter;
      const dateMatch =
        !this.dateFilter ||
        appt.date.toISOString().split('T')[0] === this.dateFilter;
      return statusMatch && dateMatch;
    });
  }
}
