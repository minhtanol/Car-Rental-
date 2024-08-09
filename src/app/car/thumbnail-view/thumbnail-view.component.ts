import { Component } from '@angular/core';
import {NavbarComponent} from "../../common/navbar/navbar.component";
import {FooterComponent} from "../../common/footer/footer.component";

@Component({
  selector: 'app-thumbnail-view',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './thumbnail-view.component.html',
  styleUrl: './thumbnail-view.component.css'
})
export class ThumbnailViewComponent {

}
