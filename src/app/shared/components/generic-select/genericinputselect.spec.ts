import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Genericinputselect } from './genericinputselect';

describe('Genericinputselect', () => {
  let component: Genericinputselect;
  let fixture: ComponentFixture<Genericinputselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Genericinputselect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Genericinputselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
