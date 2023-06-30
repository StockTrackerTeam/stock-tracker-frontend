import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSubLevelCreateComponent } from './asset-sub-level-create.component';

describe('AssetSubLevelCreateComponent', () => {
  let component: AssetSubLevelCreateComponent;
  let fixture: ComponentFixture<AssetSubLevelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSubLevelCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSubLevelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
