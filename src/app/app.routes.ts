import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./account/login/login.component";
import {SignupComponent} from "./account/signup/signup.component";
import {ChangeProfileComponent} from "./account/change-profile/change-profile.component";
import {ChangePasswordComponent} from "./account/change-password/change-password.component";
import {ForgotPasswordComponent} from "./account/forgot-password/forgot-password.component";
import {FindCarComponent} from "./car/find-car/find-car.component";
import {ThumbnailViewComponent} from "./car/thumbnail-view/thumbnail-view.component";
import {ListViewComponent} from "./car/list-view/list-view.component";
import {CarDetailsComponent} from "./car/car-details/car-details.component";
import {DetailsComponent} from "./car/car-details/details/details.component";
import {AddCarComponent} from "./car/add-car/add-car.component";
import {ResetPasswordComponent} from "./account/forgot-password/reset-password/reset-password.component";
import {authGuard} from "../authguard/auth.guard";
import {Step1BookingComponent} from "./booking/step1-booking/step1-booking.component";
import {Step2BookingComponent} from "./booking/step2/step2.component";
import {MyBookingComponent} from "./booking/my-booking/my-booking.component";
import {Step3BookingComponent} from "./booking/step3/step3.component";
import {DetailsBookingComponent} from "./booking/my-booking/details/details.component";
import {loginedGuard} from "../authguard/logined.guard";
import {MyWalletComponent} from "./account/my-wallet/my-wallet.component";
import {AboutUsComponent} from "./about-us/about-us.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "account/login", component: LoginComponent, canActivate: [loginedGuard]},
  {path: "account/signup", component: SignupComponent, canActivate: [loginedGuard]},
  {path: "account/change-profile", component: ChangeProfileComponent, canActivate: [authGuard]},
  {path: "account/change-password", component: ChangePasswordComponent, canActivate: [loginedGuard]},
  {path: "account/forgot-password", component: ForgotPasswordComponent, canActivate: [loginedGuard]},
  {path:"account/my-wallet", component: MyWalletComponent, canActivate: [authGuard]},
  {path: "car/find-car", component: FindCarComponent},
  {path: "car/thumbnail-view", component: ThumbnailViewComponent},
  {path: "car/list-view", component: ListViewComponent},
  {path: "car/car-details", component: CarDetailsComponent},
  {path: "car/car-details/details", component: DetailsComponent},
  {path: "car/add-car", component: AddCarComponent},
  {path: "account/forgot-password/reset-password/:token", component:ResetPasswordComponent,canActivate: [loginedGuard], pathMatch: 'full'},
  {path: "booking/step1", component: Step1BookingComponent},
  {path: "booking/step2", component: Step2BookingComponent},
  {path: "booking/step3", component: Step3BookingComponent},
  {path: "booking/my-booking", component: MyBookingComponent},
  {path: "booking/my-booking/details", component: DetailsBookingComponent},
  {path: "about-us", component: AboutUsComponent},
  {path: '**', redirectTo: '/' }
];
