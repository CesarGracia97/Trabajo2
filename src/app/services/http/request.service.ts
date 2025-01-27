import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost/trabajo2/';

  createTask(name: string, details: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      NAME: name,
      DETAILS: details
    }
    return this.http.post(this.apiUrl, body, { headers });
  }

  getTask(): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  deleteTask(taskId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { ID: taskId };
  
    return this.http.delete<any>(`${this.apiUrl}`, { headers, body });
  }

  updateTask(updatedTask: Task) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      ID: updatedTask.ID,
      NAME: updatedTask.NAME,
      DETAILS: updatedTask.DETAILS,
      STATE: updatedTask.STATE,
      DCREATION: updatedTask.DCREATION,
      DEND: updatedTask.DEnd
    };
    return this.http.put(`${this.apiUrl}/tasks`, body, { headers });
  }
}
