import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  userName: string | null = null;
  replaceName: string | null = null;

  constructor(private authService: AuthService,
              private userService: UserService) {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userService.getUser().subscribe({
        next: (data: any) => {
          this.userName = data.name;
          this.replaceName = 'User' + data.userId;
        },
        error: (err) => {
          console.error("Error fetching user", err);
        }
      });
    }
  }


  logout(): void {
    Swal.fire({
      title: "<h3>Do you want to log out?</h3>",
      confirmButtonText: "Logout",
      confirmButtonColor: "#ddad33",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
        this.isLoggedIn = false;
        this.userName = null;
      }
    });


  }

}
