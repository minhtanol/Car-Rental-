import { Component } from '@angular/core';
import {NavbarComponent} from "../../../common/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-details',
  standalone: true,
    imports: [
        NavbarComponent,
        RouterLink
    ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

}
