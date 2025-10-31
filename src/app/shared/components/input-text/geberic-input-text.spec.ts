import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gebericinputtext } from './generic-input-text';

describe('Gebericinputtext', () => {
  let component: Gebericinputtext;
  let fixture: ComponentFixture<Gebericinputtext>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gebericinputtext],
    }).compileComponents();

    fixture = TestBed.createComponent(Gebericinputtext);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
