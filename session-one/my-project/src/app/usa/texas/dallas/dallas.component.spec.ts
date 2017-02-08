/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DallasComponent } from './dallas.component';

describe('DallasComponent', () => {
  let component: DallasComponent;
  let fixture: ComponentFixture<DallasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DallasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
