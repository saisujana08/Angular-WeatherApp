import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cardComponent } from './card.component';

describe('cardComponent', () => {
  let component: cardComponent;
  let fixture: ComponentFixture<cardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [cardComponent]
    });
    fixture = TestBed.createComponent(cardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
