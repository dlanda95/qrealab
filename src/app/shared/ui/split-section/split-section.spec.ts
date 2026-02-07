import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitSection } from './split-section';

describe('SplitSection', () => {
  let component: SplitSection;
  let fixture: ComponentFixture<SplitSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
