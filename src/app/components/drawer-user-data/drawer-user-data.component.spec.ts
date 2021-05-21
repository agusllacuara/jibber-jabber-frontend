import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerUserDataComponent } from './drawer-user-data.component';

describe('DrawerUserDataComponent', () => {
  let component: DrawerUserDataComponent;
  let fixture: ComponentFixture<DrawerUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerUserDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
