import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanoListComponent } from './humano-list.component';

describe('HumanoListComponent', () => {
  let component: HumanoListComponent;
  let fixture: ComponentFixture<HumanoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumanoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumanoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
