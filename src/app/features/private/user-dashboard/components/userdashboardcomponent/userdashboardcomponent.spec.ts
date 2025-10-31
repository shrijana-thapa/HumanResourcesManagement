import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userdashboardcomponent } from './userdashboardcomponent';

describe('Userdashboardcomponent', () => {
  let component: Userdashboardcomponent;
  let fixture: ComponentFixture<Userdashboardcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Userdashboardcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userdashboardcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
