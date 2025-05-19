import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  imports: [NgIf, NgFor],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent {
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
    if (this.currentStep < 5) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  resetForm() {
    this.currentStep = 1;
    this.formData = {
      specialty: '',
      doctor: '',
      date: '',
      time: ''
    };
  }
  }
  

