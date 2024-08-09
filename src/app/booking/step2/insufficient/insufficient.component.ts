import { Component } from '@angular/core';
import {FooterComponent} from "../../../common/footer/footer.component";
import {NavbarComponent} from "../../../common/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-insufficient',
  standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent,
        RouterLink
    ],
  templateUrl: './insufficient.component.html',
  styleUrl: './insufficient.component.css'
})
export class InsufficientComponent {

}
