import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChillBannerComponent } from './chill-banner.component';

describe('ChillBannerComponent', () => {
  let component: ChillBannerComponent;
  let fixture: ComponentFixture<ChillBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChillBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChillBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
