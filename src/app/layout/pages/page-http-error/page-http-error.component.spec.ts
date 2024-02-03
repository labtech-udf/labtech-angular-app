import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHttpErrorComponent } from './page-http-error.component';

describe('PageHttpErrorComponent', () => {
  let component: PageHttpErrorComponent;
  let fixture: ComponentFixture<PageHttpErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHttpErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageHttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
