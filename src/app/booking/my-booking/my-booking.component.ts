import { Component } from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent {

}
