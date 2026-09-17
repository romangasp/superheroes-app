import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from '../../core/services/spinner-service/spinner.service';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: SpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    spinnerService = TestBed.inject(SpinnerService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show spinner when loading is true', () => {
    spinnerService.show();

    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');

    expect(spinner).toBeTruthy();
  });
});
