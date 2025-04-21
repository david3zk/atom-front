import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Task } from '../../../models/task.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService<Task> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/tasks`);
  }
}