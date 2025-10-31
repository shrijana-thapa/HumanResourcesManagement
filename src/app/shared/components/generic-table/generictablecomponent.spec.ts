import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generictablecomponent } from './generictablecomponent';

describe('Generictablecomponent', () => {
  let component: Generictablecomponent;
  let fixture: ComponentFixture<Generictablecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Generictablecomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Generictablecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
