import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosPageComponent } from './superheros-page.component';

describe('SuperherosPageComponent', () => {
  let component: SuperherosPageComponent;
  let fixture: ComponentFixture<SuperherosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperherosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperherosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
