import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanoFormComponent } from './humano-form.component';

describe('HumanoFormComponent', () => {
  let component: HumanoFormComponent;
  let fixture: ComponentFixture<HumanoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
