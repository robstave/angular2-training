import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  static nateValidator(control) {
    if (control.value !== "nate") {
      return null;
    } else {
      return { 'invalidNate': true };
    }
  }


  static emailValidator(control) {
    if (control.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static phoneValidator(control) {
    if (control.value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
      return null;
    } else {
      return { 'invalidPhone': true };
    }
  }

}


