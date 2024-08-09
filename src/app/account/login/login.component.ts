import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../service/auth.service";
import {StoreUrlService} from "../../../service/storeUrl.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message?: string;
  email?: string;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private storeUrl: StoreUrlService,
              private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      if (navigation.extras.state['resetPasswordSuccessMessage']) {
        this.message = navigation.extras.state['resetPasswordSuccessMessage'];
      }
      if (navigation.extras.state['registerSuccessMessage']) {
        this.message = navigation.extras.state['registerSuccessMessage'];
      }
      this.email = navigation.extras.state['email'];
    }
  }

  ngOnInit(): void {
    if (this.message || this.email) {
      this.loginForm.get('username')?.setValue(this.email);
      this.toastr.success(this.message);
      history.replaceState({}, '', window.location.pathname);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData: FormData = new FormData();
      formData.append('username', this.loginForm.get('username')?.value);
      formData.append('password', this.loginForm.get('password')?.value);
      console.log(formData)
      this.authService.login(formData).subscribe({
        next: (response) => {
          const token = response.token;
          this.authService.saveToken(token);
          const directUrl = this.storeUrl.getStoreUrl() || '/';
          this.storeUrl.setStoreUrl('')
          this.router.navigate([directUrl], {state: {loginSuccessMessage: 'login successfully'}});
        },
        error: (err) => {
          this.toastr.warning('Invalid email or password');
        }
      });
    }
  }


}
