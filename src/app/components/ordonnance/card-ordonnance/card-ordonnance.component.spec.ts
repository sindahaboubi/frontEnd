import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrdonnanceComponent } from './card-ordonnance.component';

describe('CardOrdonnanceComponent', () => {
  let component: CardOrdonnanceComponent;
  let fixture: ComponentFixture<CardOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOrdonnanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
