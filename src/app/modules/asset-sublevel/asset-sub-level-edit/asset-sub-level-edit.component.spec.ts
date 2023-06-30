import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSubLevelEditComponent } from './asset-sub-level-edit.component';

describe('AssetSubLevelEditComponent', () => {
  let component: AssetSubLevelEditComponent;
  let fixture: ComponentFixture<AssetSubLevelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSubLevelEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSubLevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
