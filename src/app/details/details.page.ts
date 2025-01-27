import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonButton, IonToast, IonLoading, IonItem, IonLabel, IonRadio } from '@ionic/angular/standalone';
import { IntermediateService } from '../services/intermediate/intermediate.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/interface/task.interface';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonButton, IonContent, CommonModule, FormsModule, IonLoading, IonToast ]
})
export class DetailsPage implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  isLoading: boolean = false; 
  toastMessage: string = ''; 

  constructor(private mid: IntermediateService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.mid.getTask().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data; // Inicializamos la lista filtrada con todas las tareas
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      },
    });
  }

  
  filterTasks() {
    this.filteredTasks = this.tasks.filter((task) =>
      task.NAME.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleEdit(task: Task) {
    task.isEditing = !task.isEditing;
    // Si el estado cambia a 'F', asignar la fecha de fin
    if (task.isEditing && task.STATE === 'F' && !task.DEnd) {
      task.DEnd = new Date(); // Fecha actual
    }
  }

  saveTask(task: Task) {
    this.isLoading = true;
  
    // Solo actualizamos si se están editando los campos
    const updatedTask = {
      ID: task.ID,
      NAME: task.NAME,
      DETAILS: task.DETAILS,
      STATE: task.STATE,
      DCREATION: task.DCREATION,
      DEnd: task.DEnd ? task.DEnd : null, 
    };
  
    this.mid.updateTask(updatedTask).subscribe({
      next: () => {
        task.isEditing = false;
        this.toastMessage = 'Tarea actualizada correctamente.';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al actualizar tarea:', err);
        this.toastMessage = 'Hubo un error al actualizar la tarea.';
        this.isLoading = false;
      },
    });
  }

  deleteTask(taskId: number) {
    this.isLoading = true;
    this.mid.deleteTask(taskId).subscribe({
      next: () => {
        this.filteredTasks = this.filteredTasks.filter((task) => task.ID !== taskId);
        this.tasks = this.tasks.filter((task) => task.ID !== taskId);
        this.toastMessage = 'Tarea eliminada correctamente.';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
        this.toastMessage = 'Hubo un error al eliminar la tarea.';
        this.isLoading = false;
      },
    });
  }
  
  showToast() {
    const toast = document.createElement('ion-toast');
    toast.message = this.toastMessage;
    toast.duration = 2000;
    toast.position = 'bottom'; 
    document.body.appendChild(toast);
    toast.present();
  }

  irPagina(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
