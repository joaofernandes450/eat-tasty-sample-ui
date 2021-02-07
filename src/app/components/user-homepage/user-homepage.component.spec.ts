import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserHomepageComponent } from './user-homepage.component';

describe('UserHomepageComponent', () => {
  let component: UserHomepageComponent;
  let fixture: ComponentFixture<UserHomepageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
