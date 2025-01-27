import { Injectable } from '@angular/core';
import { RequestService } from '../http/request.service';
import { Task } from 'src/app/interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class IntermediateService {

  constructor( private getdata: RequestService) { }

  getTask(){
    return this.getdata.getTask();
  }
  sendTask(name: string, details: string){
    return this.getdata.createTask(name, details)
  }
  deleteTask(taskId: number) {
    return this.getdata.deleteTask(taskId);
  }

  updateTask(task: Task) {
    return this.getdata.updateTask(task);
  }
}
