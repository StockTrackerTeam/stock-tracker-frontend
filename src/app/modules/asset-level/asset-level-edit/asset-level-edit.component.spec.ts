import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLevelEditComponent } from './asset-level-edit.component';

describe('AssetLevelEditComponent', () => {
  let component: AssetLevelEditComponent;
  let fixture: ComponentFixture<AssetLevelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLevelEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
