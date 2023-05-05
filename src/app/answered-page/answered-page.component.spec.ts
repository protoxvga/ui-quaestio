import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredPageComponent } from './answered-page.component';

describe('AnsweredPageComponent', () => {
  let component: AnsweredPageComponent;
  let fixture: ComponentFixture<AnsweredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsweredPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
