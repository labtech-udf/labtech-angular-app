import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModalComponent } from './list-modal.component';

describe('ListModalComponent', () => {
  let component: ListModalComponent;
  let fixture: ComponentFixture<ListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
