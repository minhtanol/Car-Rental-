import { Component } from '@angular/core';
import { FooterComponent } from "../../common/footer/footer.component";
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { Router, RouterLink } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { NgIf } from "@angular/common";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator() });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData:FormData = this.signupForm.value;

      this.authService.register(formData).subscribe({
        next: (user) => {
          this.router.navigate(['account/login'],{ state: { registerSuccessMessage: 'register successfully', email : user.email }});
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      if (!this.signupForm.get('terms')?.value) {
        this.signupForm.get('terms')?.markAsTouched();
        this.errorMsg = 'You must agree to the terms to proceed.';
      } else {
        this.errorMsg = 'Please ensure all fields are correctly filled.';
      }
    }
  }
}
