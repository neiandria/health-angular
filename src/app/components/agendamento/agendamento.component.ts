// src/app/components/agendamento/agendamento.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, Appointment, BaseUser } from '../../services/user.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AgendamentoComponent implements OnInit {
  currentStep = 1;
  formData = {
    specialty: '',
    doctor: '',
    date: '',
    time: ''
  };

  specialties = ['Cardiologia', 'Dermatologia', 'Pediatria', 'Ortopedia'];

  doctorsBySpecialty: Record<string, string[]> = {
    'Cardiologia': ['Dra. Ana Cardio', 'Dr. João Coração'],
    'Dermatologia': ['Dr. Pedro Pele', 'Dra. Camila Derma'],
    'Pediatria': ['Dra. Juliana Kids', 'Dr. Marcelo Pedia'],
    'Ortopedia': ['Dr. Carlos Orto', 'Dra. Fernanda Osso']
  };

  availableDates = ['2025-05-20', '2025-05-21', '2025-05-22', '2025-05-23', '2025-05-24'];

  timeSlotsByDate: Record<string, { time: string; available: boolean }[]> = {
    '2025-05-20': [{ time: '08:00', available: true }, { time: '10:00', available: false }, { time: '14:00', available: true }],
    '2025-05-21': [{ time: '09:00', available: true }, { time: '11:00', available: true }],
    '2025-05-22': [{ time: '08:30', available: true }, { time: '13:00', available: true }],
    '2025-05-23': [{ time: '10:00', available: true }, { time: '15:00', available: false }],
    '2025-05-24': [{ time: '09:30', available: true }, { time: '11:30', available: true }]
  };

  private user: BaseUser | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (!this.user || this.user.accountType !== 'patient') {
      this.router.navigate(['/login']);
    }
  }

  selectSpecialty(specialty: string) {
    this.formData.specialty = specialty;
    this.formData.doctor = '';
  }

  selectDoctor(doctor: string) {
    this.formData.doctor = doctor;
  }

  selectDate(date: string) {
    this.formData.date = date;
    this.formData.time = '';
  }

  selectTime(slot: { time: string; available: boolean }) {
    if (slot.available) {
      this.formData.time = slot.time;
    }
  }

  getDoctorsForSpecialty(): string[] {
    return this.doctorsBySpecialty[this.formData.specialty] || [];
  }

  getTimeSlotsForDate(): { time: string; available: boolean }[] {
    return this.timeSlotsByDate[this.formData.date] || [];
  }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

 confirmAppointment() {
  if (!this.user) return;

  console.log('agendamento confirmado');
  
  const appointment: Appointment = {
    doctorName: this.formData.doctor,
    specialty: this.formData.specialty,
    date: new Date(this.formData.date),
    time: this.formData.time,
    status: 'agendada'
  };

  this.userService.addAppointmentForPatient(this.user.email, appointment);

  // Redireciona para a tela do paciente após confirmar
  this.router.navigate(['/consultas']);
}
}
