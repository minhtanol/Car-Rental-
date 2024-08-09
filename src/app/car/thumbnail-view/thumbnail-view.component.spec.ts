import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailViewComponent } from './thumbnail-view.component';

describe('ThumbnailViewComponent', () => {
  let component: ThumbnailViewComponent;
  let fixture: ComponentFixture<ThumbnailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
