import { Component } from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {FooterComponent} from "../../common/footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-wallet',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './my-wallet.component.html',
  styleUrl: './my-wallet.component.css'
})
export class MyWalletComponent {

}
