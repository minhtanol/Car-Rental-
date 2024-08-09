import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {FooterComponent} from "../../common/footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms';
import {LocationService} from "../../../service/location.service";
import {AuthService} from "../../../service/auth.service";


@Component({
  selector: 'app-change-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, NgForOf, ReactiveFormsModule, RouterLink],
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {

  formLocation: FormGroup;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLocation = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationalId: ['', Validators.required],
      driverLicense: ['', Validators.required],
      provinceName: ['', Validators.required],
      districtName: ['', Validators.required],
      wardName: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProvinces();
  }

  loadProvinces(): void {
    this.locationService.getProvinces().subscribe(data => this.provinces = data);
  }

  onProvinceChange(event: Event): void {
    const selectProvinceCode = (event.target as HTMLSelectElement).selectedOptions[0].dataset['provinceCode'];
    if (selectProvinceCode) {
      this.loadDistricts(selectProvinceCode);
    } else {
      this.districts = [];
      this.wards = [];
    }
  }

  onDistrictChange(event: Event): void {
    const selectDistrictCode = (event.target as HTMLSelectElement).selectedOptions[0].dataset['districtCode'];
    if (selectDistrictCode) {
      this.loadWards(selectDistrictCode);
    } else {
      this.wards = [];
    }
  }

  loadDistricts(provinceCode: string): void {
    this.locationService.getDistricts(provinceCode).subscribe(data => {
      this.districts = data;
      this.wards = [];
    });
  }

  loadWards(districtCode: string): void {
    this.locationService.getWards(districtCode).subscribe(data => this.wards = data);
  }

  onSubmit(): void {
    console.log(this.formLocation)
    if (this.formLocation.valid) {
      const formData = this.formLocation.value;
      console.log(formData);
      this.authService.updateProfile(formData).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Failed to update profile.';
          this.successMessage = null;
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.successMessage = null;
    }
  }

  discard(): void {
    this.formLocation.reset();
  }
}
