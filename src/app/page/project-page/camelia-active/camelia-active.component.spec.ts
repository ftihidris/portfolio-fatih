import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameliaActiveComponent } from './camelia-active.component';

describe('CameliaActiveComponent', () => {
  let component: CameliaActiveComponent;
  let fixture: ComponentFixture<CameliaActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CameliaActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameliaActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
