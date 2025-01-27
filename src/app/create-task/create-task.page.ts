import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton, IonLoading, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IntermediateService } from '../services/intermediate/intermediate.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule, IonButton, IonLoading, IonToast]
})
export class CreateTaskPage implements OnInit {
  taskName: string = ''; // Tarea nombre
  taskDetails: string = ''; // Tarea detalles
  loading: boolean = false; // Estado de carga
  toast = {
    isOpen: false,
    message: '',
    duration: 3000,
    position: 'top',
    color: 'success', // 'success', 'danger', etc.
  };

  constructor(private router: Router, private intermediateService: IntermediateService) {}

  ngOnInit() {}

  irPagina(ruta: string) {
    const rutasValidas = ['home'];
    if (rutasValidas.includes(ruta)) {
      this.router.navigate([`/${ruta}`]);
    } else {
      this.showToast('Ruta no permitida.', 'danger');
    }
  }

  onSubmit() {
    if (this.taskName && this.taskDetails) {
      this.loading = true; 
      this.intermediateService.sendTask(this.taskName, this.taskDetails).subscribe({
        next: (response) => {
          this.loading = false; // Finaliza la carga
          this.showToast('Carga de datos exitosa', 'success');
          this.taskName = ''; // Limpiar campos
          this.taskDetails = '';
        },
        error: (err) => {
          this.loading = false; // Finaliza la carga
          this.showToast('Carga fallida', 'danger');
          console.error('Error al crear la tarea:', err);
        }
      });
    }
  }

  showToast(message: string, color: string) {
    this.toast.message = message;
    this.toast.color = color;
    this.toast.isOpen = true;
  }

  onToastDismiss() {
    this.toast.isOpen = false;
  }
}
