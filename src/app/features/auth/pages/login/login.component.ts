import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../core/services/user/user.service';
import { StorageUtil } from '../../../../util/storage-util';
import { UserReponse } from '../../../../models/user-reponse.model';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  dialogRegistro: any;

  loading: boolean = false;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(templateRef: TemplateRef<any>): void {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log('Datos de inicio de sesión:', this.loginForm.value);
      const user = this.loginForm.value;
      console.log('value form', user)
      this.userService.getByEmail(user.email).subscribe({
        next: (response: UserReponse) => {
          console.log('response api', response);
          if (response && response.valid) {
            StorageUtil.set('_T', response.token);
            StorageUtil.set('_U', response.user);
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.warning('No se encontraron usuarios válidos');
            this.dialogRegistro = this.dialog.open(templateRef, { width: '450px' });
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

  onRegisterClick(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log('Datos de nuevo usuario:', this.registerForm.value);
      const user = this.registerForm.value;
      console.log('value form', user)
      this.userService.create(user).subscribe({
        next: (response: UserReponse) => {
          console.log('response api', response);
          if (response) {
            StorageUtil.set('_T', response.token);
            StorageUtil.set('_U', response.user);
            this.dialogRegistro.close();
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('No se pudo generar el usuario');
            this.dialogRegistro.close();
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