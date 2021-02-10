import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(): void {
    console.log('register => ',this.model);
    this.accountService.register(this.model).subscribe(
      res => {
        console.log('register =>',res);
        this.cancel();
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

}
