import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

  }

  registerToggle(): void {
    this.registerMode = true;
  }



  cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }

}
