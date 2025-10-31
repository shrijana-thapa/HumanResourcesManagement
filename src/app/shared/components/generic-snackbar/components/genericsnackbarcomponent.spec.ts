import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomSnackbarComponent } from './genericsnackbarcomponent';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('CustomSnackbarComponent', () => {
  let component: CustomSnackbarComponent;
  let fixture: ComponentFixture<CustomSnackbarComponent>;
  let snackBarRefMock: jasmine.SpyObj<MatSnackBarRef<CustomSnackbarComponent>>;

  beforeEach(async () => {
    snackBarRefMock = jasmine.createSpyObj('MatSnackBarRef', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [CustomSnackbarComponent], // standalone component
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Success Message', type: 'success' } },
        { provide: MatSnackBarRef, useValue: snackBarRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message', () => {
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.textContent.trim()).toBe('Success Message');
  });

  it('should apply correct type class', () => {
    const container = fixture.debugElement.query(By.css('.snackbar-container')).nativeElement;
    expect(container.classList.contains('success')).toBeTrue();
  });

  it('should call dismiss when close button is clicked', () => {
    const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
    closeBtn.triggerEventHandler('click');
    expect(snackBarRefMock.dismiss).toHaveBeenCalled();
  });
});
