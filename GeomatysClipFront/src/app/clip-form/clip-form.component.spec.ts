import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipFormComponent } from './clip-form.component';

describe('ClipFormComponent', () => {
  let component: ClipFormComponent;
  let fixture: ComponentFixture<ClipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
