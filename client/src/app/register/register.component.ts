import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupName, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;

  constructor(private accountService: AccountService , private toastr: ToastrService ,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      gender: ['male'],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required , Validators.minLength(4) , Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required , this.matchValues('password')]]
    });

    this.registerForm.controls.password.valueChanges.subscribe(
      () => this.registerForm.controls.confirmPassword.updateValueAndValidity()
    )
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatching: true}
    }
  }

  register(): void {
    console.log('register form => ' ,this.registerForm.value);
    // console.log('register => ',this.model);
    // this.accountService.register(this.model).subscribe(
    //   res => {
    //     console.log('register =>',res);
    //     this.cancel();
    //   },
    //   err => {
    //     console.log(err);
    //     this.toastr.error(err.error);
    //   }
    // )
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

}
