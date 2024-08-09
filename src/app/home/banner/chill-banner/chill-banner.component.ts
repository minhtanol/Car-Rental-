import { Component } from '@angular/core';
import {FooterComponent} from "../../../common/footer/footer.component";

@Component({
  selector: 'app-chill-banner',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './chill-banner.component.html',
  styleUrl: './chill-banner.component.css'
})
export class ChillBannerComponent {

}
