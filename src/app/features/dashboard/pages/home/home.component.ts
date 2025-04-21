import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { Task } from '../../../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../../../core/services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageUtil } from '../../../../util/storage-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title_modal: string = '';
  registerForm: FormGroup;
  dialogRegistro: any;
  dialogConfirm: any;
  loading: boolean = false;

  pendingTask$!: Observable<Task[]>;
  completeTask$!: Observable<Task[]>;

  taskOperacion: Task | undefined;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.filterTasks();
  }

  filterTasks(): void {
    this.pendingTask$ = this.taskService.getAll({ status: 'pending' });
    this.completeTask$ = this.taskService.getAll({ status: 'completed' });
  }

  updateTaskStatus(task: Task, newStatus: 'pending' | 'completed'): void {
    const tarea = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: newStatus
    };

    this.taskService.update(task.id, tarea).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success('Tarea Actualizada');
          this.filterTasks();
        } else {
          this.toastr.error('No se pudo guardar la tarea');
        }
      },
      error: (err) => {
        this.toastr.error('Error al obtener usuarios: ' + err.message);
        this.loading = false;
      },
    });
  }

  logout() {
    StorageUtil.remove('_T');
    StorageUtil.remove('_U');
    this.router.navigate(['/auth']);
  }

  onRegisterClick() {
    if (this.registerForm.valid) {
      this.loading = true;

      if (!this.taskOperacion) {
        const tarea = { ...this.registerForm.value, status: 'pending' };

        this.taskService.create(tarea).subscribe({
          next: (response: any) => {
            if (response) {
              this.toastr.success('Tarea Creada');
              this.dialogRegistro.close();
              this.filterTasks();
            } else {
              this.toastr.error('No se pudo guardar la tarea');
            }
            this.loading = false;
          },
          error: (err) => {
            this.toastr.error('Error al obtener usuarios: ' + err.message);
            this.loading = false;
          },
        });
      } else {
        const tarea = { ...this.registerForm.value, status: this.taskOperacion?.status };
        this.taskService.update(this.taskOperacion.id, tarea).subscribe({
          next: (response: any) => {
            if (response) {
              this.toastr.success('Tarea Actualizada');
              this.dialogRegistro.close();
              this.filterTasks();
            } else {
              this.toastr.error('No se pudo guardar la tarea');
            }
            this.loading = false;
          },
          error: (err) => {
            this.toastr.error('Error al obtener usuarios: ' + err.message);
            this.loading = false;
          },
        });
      }

    }
  }

  onOpenModal(templateRef: any) {
    this.title_modal = 'Registrar Tarea';
    this.registerForm.reset();
    this.taskOperacion = undefined;
    this.dialogRegistro = this.dialog.open(templateRef, { width: '450px' });
  }

  onOpenModalEdit(templateRef: any, task: Task) {
    this.title_modal = 'Editar Tarea';
    this.taskOperacion = task;
    this.registerForm.reset();

    this.registerForm.get('title')?.setValue(task.title);
    this.registerForm.get('description')?.setValue(task.description);
    this.dialogRegistro = this.dialog.open(templateRef, { width: '450px' });
  }

  onOpenModalConfirmEliminar(templateRef: any, task: Task) {

    this.taskOperacion = task;
    this.dialogConfirm = this.dialog.open(templateRef, { width: '300px' });
  }

  onEliminarTarea() {
    this.loading = true;
    if (!this.taskOperacion) {
      this.toastr.warning('No se pudo eliminar la tarea');
      return;
    }
    this.taskService.delete(this.taskOperacion?.id).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success('Tarea Eliminada');
          this.dialogConfirm.close();
          this.filterTasks();
        } else {
          this.toastr.error('No se pudo guardar la tarea');
        }
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener usuarios: ' + err.message);
        this.loading = false;
      },
    });
  }
}
