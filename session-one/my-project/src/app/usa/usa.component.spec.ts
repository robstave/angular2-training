/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsaComponent } from './usa.component';

describe('UsaComponent', () => {
  let component: UsaComponent;
  let fixture: ComponentFixture<UsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
