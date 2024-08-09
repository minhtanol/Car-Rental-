import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:8080/api/address';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/provinces`);
  }

  getDistricts(provinceCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/provinces/${provinceCode}/districts`);
  }

  getWards(districtCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/districts/${districtCode}/wards`);
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get?search=${address}`);
  }
}
