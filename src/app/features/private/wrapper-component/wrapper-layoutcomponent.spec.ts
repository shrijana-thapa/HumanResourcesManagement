import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperLayoutcomponent } from './wrapper-layoutcomponent';

describe('WrapperLayoutcomponent', () => {
  let component: WrapperLayoutcomponent;
  let fixture: ComponentFixture<WrapperLayoutcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperLayoutcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperLayoutcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
