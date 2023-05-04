import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionsPageComponent } from './all-questions-page.component';

describe('AllQuestionsPageComponent', () => {
  let component: AllQuestionsPageComponent;
  let fixture: ComponentFixture<AllQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQuestionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
