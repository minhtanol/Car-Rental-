import { Component } from '@angular/core';
import {NavbarComponent} from "../common/navbar/navbar.component";
import {FooterComponent} from "../common/footer/footer.component";

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

}
