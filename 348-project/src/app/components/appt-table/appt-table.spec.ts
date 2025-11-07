import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptTable } from './appt-table';

describe('ApptTable', () => {
  let component: ApptTable;
  let fixture: ComponentFixture<ApptTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApptTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApptTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
