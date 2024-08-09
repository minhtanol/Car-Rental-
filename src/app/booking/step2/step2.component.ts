import { Component } from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2BookingComponent {

}
