import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  public isSendingMail = false;
  private subscription: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.authService.getUser().subscribe(
      user => {
        console.log('[EMAIL VERIFICATION] user: ', user);
        if (user.emailVerified) {
          console.log('[EMAIL VERIFICATION] user: ', user);
          this.router.navigate(['/']);
        }
      }
    );
  }

  async sendVerificationEmail(): Promise<void> {
    this.isSendingMail = true;

    try {
      await this.authService.sendVerificationEmail();
      console.log('Mail send successfully');
      this.isSendingMail = false;
      this.showSuccessAlert();
    } catch (e) {
      this.isSendingMail = false;
      this.showErrorAlert(e.code);
    }
  }

  async redirect(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  showSuccessAlert(): void {
    Swal.fire(
      'Éxito!',
      'Hemos reenviado tu correo, un vinculo para que puedas verificar tu email!',
      'success'
    );
  }

  showErrorAlert(code): void {
    const errorMessages = {
      'auth/too-many-requests': 'Has hecho muchos reenvios de correo.!',
      default: 'Ocurrio un error! intenta nuevamente.'
    };

    Swal.fire(
      'Error!',
      errorMessages[code] || errorMessages.default,
      'error'
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
