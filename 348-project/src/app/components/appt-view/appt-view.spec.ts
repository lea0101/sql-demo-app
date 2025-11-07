import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptView } from './appt-view';

describe('ApptView', () => {
  let component: ApptView;
  let fixture: ComponentFixture<ApptView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApptView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApptView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
