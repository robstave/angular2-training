import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {ValidationService} from '../shared/validation.service';
import {User} from './user.interface'


@Component({
  selector: 'app-reactive-fm',
  templateUrl: './reactive-fm.component.html',
  styleUrls: ['./reactive-fm.component.css']
})
export class ReactiveFmComponent implements OnInit {

  userForm: any;

  constructor(private formBuilder: FormBuilder) {


     this.userForm = this.formBuilder.group({
      'name': ['', [Validators.required, ValidationService.nateValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator] ],
      'phone': ['', [Validators.required, ValidationService.phoneValidator]]
    });
   }

  saveUser() {
    console.log(this.userForm)
  }
  ngOnInit() {
  }

}
