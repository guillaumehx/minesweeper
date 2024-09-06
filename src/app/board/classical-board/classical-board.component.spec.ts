import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicalBoardComponent } from './classical-board.component';

describe('ClassicalBoardComponent', () => {
  let component: ClassicalBoardComponent;
  let fixture: ComponentFixture<ClassicalBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicalBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassicalBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
