import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidenavbarcomponent } from './sidenavbarcomponent';

describe('Sidenavbarcomponent', () => {
  let component: Sidenavbarcomponent;
  let fixture: ComponentFixture<Sidenavbarcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sidenavbarcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidenavbarcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
