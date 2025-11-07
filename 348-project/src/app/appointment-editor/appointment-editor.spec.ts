import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEditor } from './appointment-editor';

describe('AppointmentEditor', () => {
  let component: AppointmentEditor;
  let fixture: ComponentFixture<AppointmentEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
