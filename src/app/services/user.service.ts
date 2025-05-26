// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

export interface BaseUser {
  fullName: string;
  email: string;
  password: string;
  accountType: 'patient' | 'doctor' | 'receptionist';
  gender?: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  crm?: string;
  specialty?: string;
}

export interface Appointment {
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'agendada' | 'concluida' | 'cancelada';
  reason?: string; // Motivo da consulta
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private patients: BaseUser[] = [
    {
      fullName: 'João Silva',
      email: 'joao.silva@example.com',
      password: '123456',
      accountType: 'patient',
      gender: 'male',
      phone: '11999990000',
      cpf: '123.456.789-00',
      birthDate: '1990-01-01'
    },
    {
      fullName: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      password: '123456',
      accountType: 'patient',
      gender: 'female',
      phone: '11988880000',
      cpf: '987.654.321-00',
      birthDate: '1985-05-15'
    }
  ];

  private doctors: BaseUser[] = [
    {
      fullName: 'Dra. Ana Cardio',
      email: 'ana.cardio@example.com',
      password: '123456',
      accountType: 'doctor',
      crm: 'CRM12345',
      specialty: 'Cardiologia'
    },
    {
      fullName: 'Dr. Pedro Pele',
      email: 'pedro.pele@example.com',
      password: '123456',
      accountType: 'doctor',
      crm: 'CRM54321',
      specialty: 'Dermatologia'
    }
  ];

  private receptionists: BaseUser[] = [
    {
      fullName: 'Ana Recepcionista',
      email: 'ana.recepcao@example.com',
      password: '123456',
      accountType: 'receptionist'
    }
  ];

  private appointmentsMap: Record<string, Appointment[]> = {};
  private currentUser: BaseUser | null = null;

  constructor() {
    // Inicializa mapa de consultas para pacientes pré-definidos
    this.patients.forEach(p => {
      this.appointmentsMap[p.email] = [];
    });

    // Adiciona consultas iniciais para João Silva
    this.addAppointmentForPatient('joao.silva@example.com', {
      doctorName: 'Dra. Ana Cardio',
      specialty: 'Cardiologia',
      date: new Date('2025-06-15'),
      time: '14:30',
      status: 'agendada',
      reason: 'Retorno - Hipertensão'
    });
    this.addAppointmentForPatient('joao.silva@example.com', {
      doctorName: 'Dr. Pedro Pele',
      specialty: 'Dermatologia',
      date: new Date('2025-05-20'),
      time: '10:00',
      status: 'concluida',
      reason: 'Check-up anual'
    });

    // Adiciona consultas iniciais para Maria Oliveira
    this.addAppointmentForPatient('maria.oliveira@example.com', {
      doctorName: 'Dr. Pedro Pele',
      specialty: 'Dermatologia',
      date: new Date('2025-05-25'),
      time: '11:00',
      status: 'agendada',
      reason: 'Dor no peito'
    });
  }

  addUser(user: BaseUser) {
    switch (user.accountType) {
      case 'patient':
        this.patients.push(user);
        this.appointmentsMap[user.email] = [];
        break;
      case 'doctor':
        this.doctors.push(user);
        break;
      case 'receptionist':
        this.receptionists.push(user);
        break;
    }
  }

  getPatients(): BaseUser[] {
    return this.patients;
  }

  getDoctors(): BaseUser[] {
    return this.doctors;
  }

  getReceptionists(): BaseUser[] {
    return this.receptionists;
  }

  getUserByCredentials(email: string, password: string): BaseUser | undefined {
    const all = [...this.patients, ...this.doctors, ...this.receptionists];
    return all.find(u => u.email === email && u.password === password);
  }

  setCurrentUser(user: BaseUser) {
    this.currentUser = user;
  }

  getCurrentUser(): BaseUser | null {
    return this.currentUser;
  }

  addAppointmentForPatient(email: string, appt: Appointment) {
    if (!this.appointmentsMap[email]) {
      this.appointmentsMap[email] = [];
    }
    this.appointmentsMap[email].push(appt);
  }

  getAppointmentsForPatient(email: string): Appointment[] {
    return this.appointmentsMap[email] || [];
  }

  // Novo: retorna consultas de um médico, agregando paciente e detalhes
  getAppointmentsForDoctor(doctorName: string): Array<{ patient: BaseUser; appt: Appointment }> {
    const result: Array<{ patient: BaseUser; appt: Appointment }> = [];
    for (const patient of this.patients) {
      const appts = this.getAppointmentsForPatient(patient.email);
      appts.forEach(a => {
        if (a.doctorName === doctorName) {
          result.push({ patient, appt: a });
        }
      });
    }
    return result;
  }
}
