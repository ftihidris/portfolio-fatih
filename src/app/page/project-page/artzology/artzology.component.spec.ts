import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtzologyComponent } from './artzology.component';

describe('ArtzologyComponent', () => {
  let component: ArtzologyComponent;
  let fixture: ComponentFixture<ArtzologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtzologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtzologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
