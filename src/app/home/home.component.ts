import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../common/navbar/navbar.component";
import {BannerComponent} from "./banner/banner.component";
import {FooterComponent} from "../common/footer/footer.component";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarComponent,
    BannerComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  loginSuccessMessage? : string;

  constructor(private router: Router,
              private toastr: ToastrService,
              private title: Title) {
    this.title.setTitle('Home');
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.loginSuccessMessage = navigation.extras.state['loginSuccessMessage'];
    }
  }

  ngOnInit(): void {
    if (this.loginSuccessMessage) {
      this.toastr.success(this.loginSuccessMessage);
      history.replaceState({}, '', window.location.pathname);
    }
  }




}
