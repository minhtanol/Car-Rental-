import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarModel {
  private baseUrl = 'http://localhost:8080/api/car-models';

  constructor(private http: HttpClient) {
  }

  getBrandName(): Observable<any> {
    return this.http.get(`${this.baseUrl}/brands`);

  }
  getCarModelsByBrand(brandId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/brands/${brandId}/models`);
  }

}
