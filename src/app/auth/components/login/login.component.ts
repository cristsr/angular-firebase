import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = this.form.value;
    console.log('Form: ', credentials);
    this.authService.login(credentials).then(
      () => {
        console.log('Login successfully ', this.authService.getCurrentUser());
        this.router.navigate(['/']);
      },
      err => {
        console.log('Error registry :', err.code);
        this.showErrorRegistrationMessage(err.code);
      }
    );
  }

  showErrorRegistrationMessage(code): void {
    const errorMessages = {
      'auth/user-not-found': 'Usuario no encontrado!',
      'auth/wrong-password': 'Contraseña incorrecta!',
      default: 'Ocurrio un error! intenta nuevamente.'
    };

    Swal.fire(
      'Error!',
      errorMessages[code] || errorMessages.default,
      'error'
    );
  }
}
