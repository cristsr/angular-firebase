import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, this.matchValues('password')]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
  ) {}

  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      return control.value === control.parent?.controls[matchTo]?.value
        ? null
        : { match: true };
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = this.form.value;
    console.log('Form: ', credentials);
    this.authService.register(credentials).then(
      () => {
        console.log('Successfully register');
        this.showSuccessRegistrationMessage();
      },
      err => {
        console.log('Error registry', err.code);
        this.showErrorRegistrationMessage(err.code);
      }
    );
  }

  showSuccessRegistrationMessage(): void {
    Swal.fire(
      'Éxito!',
      'Te has registrado exitosamente!',
      'success'
    );
  }

  showErrorRegistrationMessage(code): void {
    const errorMessages = {
      'auth/email-already-in-use': 'El correo electronico ya esta en uso!',
      default: 'Ocurrio un error! intenta nuevamente.'
    };

    Swal.fire(
      'Error!',
      errorMessages[code] || errorMessages.default,
      'error'
    );
  }
}
