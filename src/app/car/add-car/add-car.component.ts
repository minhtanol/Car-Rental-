import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {FooterComponent} from "../../common/footer/footer.component";
import {RouterLink} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgClass, NgForOf, NgOptimizedImage, NgStyle} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CarModel} from "../../../service/car.model";
import {LocationService} from "../../../service/location.service";
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CdkDropList} from "@angular/cdk/drag-drop";

@Component({

  selector: 'app-add-car',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    MatTabGroup,
    MatTab,
    NgForOf,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatFormField,
    MatButton,
    MatStepperNext,
    MatStepLabel,
    MatIcon,
    CdkDropList,
    NgClass,
    MatStepperPrevious,
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  validateBasic = false;
  validateDetail = false;
  validatePricing = false;
  formData = new FormData();
  isLinear = false;
  basic!: FormGroup;
  details!: FormGroup;
  pricing!: FormGroup;

  thumbnail: { [key: string]: string } = {
    frontImage: '',
    backImage: '',
    leftImage: '',
    rightImage: ''
  }
  colors: string[] = [
    'White', 'Black', 'Gray', 'Silver', 'Red', 'Blue',
    'Brown', 'Green', 'Beige', 'Gold', 'Yellow', 'Purple'
  ];

  brands: any[] = [];
  models: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(private fb: FormBuilder,
              private carModelService: CarModel,
              private locationService: LocationService) {
    this.basic = this.fb.group({
      licensePlate: ['', Validators.required],
      color: ['', Validators.required],
      brandName: ['', Validators.required],
      model: ['', Validators.required],
      productionYear: [1950, [Validators.required, Validators.min(1950), Validators.max(new Date().getFullYear())]],
      seats: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      basicFiles: this.fb.group({
        registration: ['', Validators.required],
        certificateOfInspection: ['', Validators.required],
        insurance: ['', Validators.required]
      })
    });

    this.details = this.fb.group({
      mileage: ['', [Validators.required, Validators.min(1)]],
      fuelConsumption: ['', [Validators.required, Validators.min(1)]],
      provinceName: ['', Validators.required],
      districtName: ['', Validators.required],
      wardName: ['', Validators.required],
      streetName: ['', Validators.required],
      description: ['', Validators.required],
      functions: this.fb.group({
        BLUETOOTH: [false],
        GPS: [false],
        CAMERA: [false],
        SUN_ROOF: [false],
        CHILD_LOCK: [false],
        CHILD_SEAT: [false],
        DVD: [false],
        USB: [false]
      }),
      detailFiles: this.fb.group({
        frontImage: ['', Validators.required],
        backImage: ['', Validators.required],
        leftImage: ['', Validators.required],
        rightImage: ['', Validators.required]
      })
    });

    this.pricing = this.fb.group({
      basePrice: ['', [Validators.required, Validators.min(100000)]],
      deposit: ['', [Validators.required, Validators.min(100000)]],
      terms: this.fb.group({
        noSmoking: ['No Smoking'],
        noFood : ['No food in car'],
        noPet: ['No pet in car'],
        other: ['']
        }
      )
    });

  }


  ngOnInit(): void {
    this.loadBrands();
    this.loadProvinces();
  }

  // load api data----------------------------------------------------------------
  // load api data----------------------------------------------------------------
  // load api data----------------------------------------------------------------
  // load api data----------------------------------------------------------------
  loadBrands(): void {
    this.carModelService.getBrandName().subscribe(data => this.brands = data);
  }

  onBrand(event: Event): void {
    const selectedBrandId = (event.target as HTMLSelectElement).selectedOptions[0].dataset['brandId'];
    if (selectedBrandId) {
      this.loadModels(selectedBrandId);
    } else {
      this.models = [];
    }
  }

  loadModels(brandId: string): void {
    this.carModelService.getCarModelsByBrand(brandId).subscribe(data => this.models = data);
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

// file change----------------------------------------------------------------
// file change----------------------------------------------------------------
// file change----------------------------------------------------------------
// file change----------------------------------------------------------------
  onFileChange(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const input = (event.target as HTMLInputElement)
    const previousSibling = input.previousSibling as HTMLDivElement
    if (input.files && input.files.length > 0) {
      //append file to form data
      const file = input.files[0];
      previousSibling.textContent = file.name
      previousSibling.title = file.name
      this.formData.append(input.name, file)

      //read file as data url for previewing in thumbnail
      if (Object.keys(this.thumbnail).includes(input.name)) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.thumbnail[input.name] = e.target?.result as string;
          console.log(this.thumbnail[input.name])
        };
        reader.readAsDataURL(file);
      }

    } else {
      this.formData.delete(input.name)
      previousSibling.textContent = 'Select file'
      previousSibling.title = 'Choose a file'
      if (Object.keys(this.thumbnail).includes(input.name)) this.thumbnail[input.name] = ''
    }
    console.log(this.formData.has(input.name), input.name, "ok");
  }

  clearFile(event: Event) {
    const close = event.target as HTMLElement
    const input = close?.nextElementSibling?.lastChild as HTMLInputElement
    const previousSibling = input?.previousSibling as HTMLDivElement
    input.value = ''
    input.dispatchEvent(new Event('change'))
    previousSibling.textContent = 'Select file'
    previousSibling.title = 'Choose a file'

  }

// drag events----------------------------------------------------------------
// drag events----------------------------------------------------------------
// drag events----------------------------------------------------------------
// drag events----------------------------------------------------------------
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const label = event.currentTarget as HTMLElement;
      const input = label.lastElementChild as HTMLInputElement;
      const acceptedTypes = input.accept.split(',').map(type => type.trim());
      const fileType = event.dataTransfer.files[0].type;
      const fileName = event.dataTransfer.files[0].name;
      const isValidType = acceptedTypes.some(acceptedType =>
        acceptedType === fileType || (acceptedType.startsWith('.') && fileName.endsWith(acceptedType))
      );
      if (isValidType) {
        input.files = event.dataTransfer.files
        input.dispatchEvent(new Event('change'))
      }
    }
    console.log('Drop:', event);
  }

  // on next button click----------------------------------------------------------------
  // on next button click----------------------------------------------------------------
  // on next button click----------------------------------------------------------------
  // on next button click----------------------------------------------------------------
  validBasic() {
    this.validateBasic = true;
  }

  validDetail() {
    this.validateDetail = true;

    //convert list boolean functions to string
    const selectedFunctions = this.details.value.functions;
    const activeFunctions = Object.keys(selectedFunctions).filter(key => selectedFunctions[key])
    this.formData.append("additionalFunctions", JSON.stringify(activeFunctions))
    console.log(this.formData.get("additionalFunctions"));
  }

  @ViewChild('noSmokingCheck') noSmokingCheck!: ElementRef<HTMLInputElement>;
  @ViewChild('noFoodCheck') noFoodCheck!: ElementRef<HTMLInputElement>;
  @ViewChild('noPetCheck') noPetCheck!: ElementRef<HTMLInputElement>;
  @ViewChild('otherCheck') otherCheck!: ElementRef<HTMLInputElement>;
  validPricing() {
    this.validatePricing = true;
    const terms = this.pricing.get('terms') as FormGroup;
    let termsOfUse : string[] = []
    if (this.noSmokingCheck.nativeElement.checked) termsOfUse.push(terms.value.noSmoking)
    if (this.noFoodCheck.nativeElement.checked) termsOfUse.push(terms.value.noFood)
    if (this.noPetCheck.nativeElement.checked) termsOfUse.push(terms.value.noPet)
    if (this.otherCheck.nativeElement.checked) {
      const otherInput = terms.value?.other;
      if (otherInput) termsOfUse.push(terms.value.other)
    }
    this.formData.append("termsOfUse", JSON.stringify(termsOfUse));
  }

  appendFormGroupToFormData(formGroup: FormGroup, formData: FormData): void {
    const formValue = formGroup.value;
    Object.keys(formValue).forEach(key => {
      const value = formValue[key];
      formData.append(key, value);
    });
  }


  onSubmit() {
    this.appendFormGroupToFormData(this.basic, this.formData);
    this.appendFormGroupToFormData(this.details, this.formData);
    this.appendFormGroupToFormData(this.pricing, this.formData);
    this.formData.forEach((v,k,p)=> console.log(k))
  }

  protected readonly Number = Number;
  protected readonly parseInt = parseInt;
  protected readonly parseFloat = parseFloat;
}
