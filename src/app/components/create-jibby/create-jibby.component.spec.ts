import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJibbyComponent } from './create-jibby.component';

describe('CreateJibbyComponent', () => {
  let component: CreateJibbyComponent;
  let fixture: ComponentFixture<CreateJibbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJibbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJibbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
