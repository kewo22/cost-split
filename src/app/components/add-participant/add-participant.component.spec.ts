import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartcipantComponent } from './add-partcipant.component';

describe('AddPartcipantComponent', () => {
  let component: AddPartcipantComponent;
  let fixture: ComponentFixture<AddPartcipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartcipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartcipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
