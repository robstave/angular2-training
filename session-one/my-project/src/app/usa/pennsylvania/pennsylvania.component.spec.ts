/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PennsylvaniaComponent } from './pennsylvania.component';

describe('PennsylvaniaComponent', () => {
  let component: PennsylvaniaComponent;
  let fixture: ComponentFixture<PennsylvaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PennsylvaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PennsylvaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
