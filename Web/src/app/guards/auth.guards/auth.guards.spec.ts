import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthGuards } from './auth.guards';

describe('AuthGuards', () => {
  let component: AuthGuards;
  let fixture: ComponentFixture<AuthGuards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGuards],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthGuards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
