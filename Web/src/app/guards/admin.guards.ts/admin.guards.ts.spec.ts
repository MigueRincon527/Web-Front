import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminGuardsTs } from './admin.guards.ts';

describe('AdminGuardsTs', () => {
  let component: AdminGuardsTs;
  let fixture: ComponentFixture<AdminGuardsTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGuardsTs],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminGuardsTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
