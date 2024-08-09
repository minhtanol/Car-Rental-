import { Component } from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {FooterComponent} from "../../common/footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3BookingComponent {

}
