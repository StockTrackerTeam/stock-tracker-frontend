import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLevelListComponent } from './asset-level-list.component';

describe('AssetLevelListComponent', () => {
  let component: AssetLevelListComponent;
  let fixture: ComponentFixture<AssetLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLevelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
