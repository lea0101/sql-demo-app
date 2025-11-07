import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGen } from './report-gen';

describe('ReportGen', () => {
  let component: ReportGen;
  let fixture: ComponentFixture<ReportGen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportGen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
