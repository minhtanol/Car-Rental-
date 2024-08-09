import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  sendForm: FormGroup |any;
  constructor(private authService: AuthService,
              private  fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router
              ) {}
  ngOnInit() {
    this.sendForm = this.fb.group({
      email: [this.route.snapshot.queryParamMap.get('email')]
    })
  }
  onSubmit() {
    this.authService.sendEmailReset(this.sendForm.value.email).subscribe()
    Swal.fire({
      html: "<p class='mt-3'>If this email address exists, we'll send an email with the link to reset your password</p>",
      confirmButtonText: "Go to Home page",
      confirmButtonColor: "#3382dd",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/"])
      }
    });
  }

}
