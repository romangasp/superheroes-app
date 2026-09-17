import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show the spinner', () => {
    service.show();

    expect(service.isLoading()).toBeTrue();
  });

  it('should hide the spinner', () => {
    service.show();
    service.hide();

    expect(service.isLoading()).toBeFalse();
  });
});
