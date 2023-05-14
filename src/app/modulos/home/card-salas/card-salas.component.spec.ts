import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSalasComponent } from './card-salas.component';

describe('CardSalasComponent', () => {
  let component: CardSalasComponent;
  let fixture: ComponentFixture<CardSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSalasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
