import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEllipsisComponent } from './menu-ellipsis.component';

describe('MenuEllipsisComponent', () => {
  let component: MenuEllipsisComponent;
  let fixture: ComponentFixture<MenuEllipsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEllipsisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEllipsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
