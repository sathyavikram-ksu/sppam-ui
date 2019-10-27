import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortDetailsComponent } from './effort-details.component';

describe('EffortDetailsComponent', () => {
  let component: EffortDetailsComponent;
  let fixture: ComponentFixture<EffortDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffortDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffortDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
