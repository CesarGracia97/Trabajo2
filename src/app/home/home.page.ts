import { Component, OnInit } from '@angular/core';
import { IonContent, IonToast, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { Task } from '../interface/task.interface';
import { IntermediateService } from '../services/intermediate/intermediate.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent, CommonModule, IonToast, IonFab, IonFabButton, IonIcon],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  loading: boolean = true;
  expandedTasks: Set<number> = new Set<number>();
  
  toast = {
    isOpen: false,
    message: '',
    duration: 3000,
    position: 'top',
    color: 'success',
  };

  constructor(private router: Router, private mid: IntermediateService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  irPagina(ruta: string) {
    const rutasValidas = ['create-task', 'details'];
    if (rutasValidas.includes(ruta)) {
      this.router.navigate([`/${ruta}`]);
    } else {
      this.showToast('Ruta no permitida.', 'danger');
    }
  }

  loadTasks() {
    this.mid.getTask().subscribe({
      next: (data) => {
        this.tasks = data; // Guardamos las tareas obtenidas
        this.loading = false;
        this.showToast('Tareas obtenidas', 'success'); // Toast al cargar datos
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
        this.loading = false;
        this.showToast('Error al conectar con la API o con la BD', 'danger'); // Toast en caso de error
      },
    });
  }

  toggleDetails(taskId: number) {
    if (this.expandedTasks.has(taskId)) {
      this.expandedTasks.delete(taskId);
    } else {
      this.expandedTasks.add(taskId);
    }
  }

  isExpanded(taskId: number): boolean {
    return this.expandedTasks.has(taskId);
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
