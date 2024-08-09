import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../../common/navbar/navbar.component";
import { FooterComponent } from "../../../common/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../../service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  resetForm: FormGroup;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      token: ['']
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.authService.checkResetToken(this.token).subscribe({
      next: () => {
        this.resetForm.patchValue({ token: this.token });
      },
      error: () => {
        Swal.fire({
          text: "Reset token is invalid or expired",
          icon: 'error',
          confirmButtonText: 'Try again later',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/"])
          }
        });
      }
    })
  }

  onSubmit() {
    this.isLoading = true;
    if (this.resetForm.valid) {
    const formData = new FormData();
    formData.append('newPassword', this.resetForm.get('newPassword')?.value);
    formData.append('token', this.resetForm.get('token')?.value);

      this.authService.sendNewPassword(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/account/login'], {state: {resetPasswordSuccessMessage: 'Password has changed successfully, please re-login'}});
        }
      });
    }
  }
}
