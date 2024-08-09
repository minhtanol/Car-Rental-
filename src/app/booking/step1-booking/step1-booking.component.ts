import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {FooterComponent} from "../../common/footer/footer.component";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {LocationService} from "../../../service/location.service";

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './step1-booking.component.html',
  styleUrl: './step1-booking.component.css'
})
export class Step1BookingComponent implements OnInit {
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder, private http: HttpClient,
    private locationService: LocationService
  ) {
    this.form = this.fb.group({
      provinceName: [''],
      districtName: [''],
      wardName: [''],
      streetName: ['', Validators.required]
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


}
