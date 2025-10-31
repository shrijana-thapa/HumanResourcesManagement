import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Genericdialogbox } from './genericdialogbox';

describe('Genericdialogbox', () => {
  let component: Genericdialogbox;
  let fixture: ComponentFixture<Genericdialogbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Genericdialogbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Genericdialogbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
