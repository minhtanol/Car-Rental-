import { Component } from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../common/footer/footer.component";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

}
