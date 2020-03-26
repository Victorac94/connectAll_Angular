import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarDesktopComponent } from './left-bar-desktop.component';

describe('LeftBarDesktopComponent', () => {
  let component: LeftBarDesktopComponent;
  let fixture: ComponentFixture<LeftBarDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftBarDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftBarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
