import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleActionBarComponent } from './collapsible-action-bar.component';

describe('CollapsibleActionBarComponent', () => {
  let component: CollapsibleActionBarComponent;
  let fixture: ComponentFixture<CollapsibleActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsibleActionBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
