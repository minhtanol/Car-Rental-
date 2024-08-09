// auth-redirect.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreUrlService {
  private url = '';

  setStoreUrl(url: string): void {
    this.url = url;
  }

  getStoreUrl(): string {
    return this.url;
  }
}
