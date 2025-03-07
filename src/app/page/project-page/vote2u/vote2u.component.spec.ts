import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vote2uComponent } from './vote2u.component';

describe('Vote2uComponent', () => {
  let component: Vote2uComponent;
  let fixture: ComponentFixture<Vote2uComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vote2uComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vote2uComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
