import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {ChillBannerComponent} from "../../home/banner/chill-banner/chill-banner.component";
import {FormControl} from "@angular/forms";
import {LocationService} from "../../../service/location.service";
import {
  MatAutocomplete,
  MatAutocompleteOrigin,
  MatAutocompleteTrigger, MatOption
} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-find-car',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    ChillBannerComponent,
    MatAutocomplete,
    MatAutocompleteOrigin,
    MatAutocompleteTrigger,
    MatInput,
    MatOption
  ],
  templateUrl: './find-car.component.html',
  styleUrl: './find-car.component.css'
})
export class FindCarComponent implements AfterViewInit{
  @ViewChild('address') addressInput?: ElementRef<HTMLInputElement>;
  options: string[] = [];
  filteredOptions: string[] = [];
  addressControl = new FormControl();
  locationService = inject(LocationService);

  ngAfterViewInit(): void {
    if (this.addressInput) {
      this.addressControl.setValue(this.addressInput.nativeElement.value);
    }

    this.addressControl.valueChanges.subscribe(value => {
      this.filter(value);
    });
  }

  filter(value: string): void {
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(value.toLowerCase()));
  }

  async changeList(event: Event): Promise<void> {
    setTimeout(  () => {
      const value = (event.target as HTMLInputElement).value;
      this.locationService.getAddress(value).subscribe({
        next: (response) => {
          this.options =  response
          console.log(this.options);
          this.filter(this.addressControl.value || '');
        },
        error: (error) => {
          console.error('Error fetching address data', error);
        }
      })
    }, 300)
  }
}
