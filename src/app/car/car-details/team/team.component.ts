import { Component } from '@angular/core';
import {NavbarComponent} from "../../../common/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-team',
  standalone: true,
    imports: [
        NavbarComponent,
        RouterLink
    ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

}
