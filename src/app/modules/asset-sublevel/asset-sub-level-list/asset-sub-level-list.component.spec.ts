import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSubLevelListComponent } from './asset-sub-level-list.component';

describe('AssetSublevelListComponent', () => {
  let component: AssetSubLevelListComponent;
  let fixture: ComponentFixture<AssetSubLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSubLevelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSubLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
