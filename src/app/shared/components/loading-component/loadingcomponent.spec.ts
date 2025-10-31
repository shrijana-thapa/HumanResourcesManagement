import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loadingcomponent } from './loadingcomponent';

describe('Loadingcomponent', () => {
  let component: Loadingcomponent;
  let fixture: ComponentFixture<Loadingcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loadingcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loadingcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
