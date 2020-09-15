import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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

  async onLogin(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = this.form.value;
    console.log('Form: ', credentials);
    try {
      const user = await this.authService.login(credentials);
      console.log('Login successfully ', user);
      this.router.navigate(['/']);
    } catch (e) {
      console.log('Error login: ', e.code);
      this.showErrorRegistrationMessage(e.code);
    }
  }

  async onLoginGoogle(): Promise<void> {
    try {
      const user = await this.authService.loginWithGoogle();
      console.log('Login successfully ', user);
      this.router.navigate(['/']);
    } catch (e) {
      console.log('Error login :', e.code);
      this.showErrorRegistrationMessage(e.code);
    }
  }

  showErrorRegistrationMessage(code): void {
    const errorMessages = {
      'auth/user-not-found': 'Usuario no encontrado!',
      'auth/wrong-password': 'Contraseña incorrecta!',
      'auth/popup-closed-by-user': 'Cancelaste la autenticación',
      default: 'Ocurrio un error! intenta nuevamente.'
    };

    Swal.fire(
      'Error!',
      errorMessages[code] || errorMessages.default,
      'error'
    );
  }
}
