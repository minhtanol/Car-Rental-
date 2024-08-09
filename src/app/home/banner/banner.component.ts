import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../common/footer/footer.component";
import {ChillBannerComponent} from "./chill-banner/chill-banner.component";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    ChillBannerComponent
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
