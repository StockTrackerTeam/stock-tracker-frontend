import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLevelCreateComponent } from './asset-level-create.component';

describe('AssetLevelCreateComponent', () => {
  let component: AssetLevelCreateComponent;
  let fixture: ComponentFixture<AssetLevelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLevelCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLevelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
