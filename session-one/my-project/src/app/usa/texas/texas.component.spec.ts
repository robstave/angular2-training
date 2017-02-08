/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TexasComponent } from './texas.component';

describe('TexasComponent', () => {
  let component: TexasComponent;
  let fixture: ComponentFixture<TexasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TexasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TexasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
