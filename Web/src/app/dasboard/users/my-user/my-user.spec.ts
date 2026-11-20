import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyUser } from './my-user';

describe('MyUser', () => {
  let component: MyUser;
  let fixture: ComponentFixture<MyUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUser],
    }).compileComponents();

    fixture = TestBed.createComponent(MyUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
