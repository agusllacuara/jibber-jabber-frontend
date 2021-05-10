import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JibComponent } from './jib.component';

describe('JibComponent', () => {
  let component: JibComponent;
  let fixture: ComponentFixture<JibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
