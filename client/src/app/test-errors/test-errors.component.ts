import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUrl + 'Buggy/not-found').subscribe(
      res => console.log(res),
      error => console.log(error.error)
    )
  }

  get400Error() {
    this.http.get(this.baseUrl + 'Buggy/bad-request').subscribe(
      res => console.log(res),
      error => console.log(error.error)
    )
  }

  get500Error() {
    this.http.get('https://localhost:5001/api/Buggy/server-error').subscribe(
      res => console.log(res),
      error => console.log(error.error)
    )
  }

  get401Error() {
    this.http.get(this.baseUrl + 'Buggy/auth').subscribe(
      res => console.log(res),
      error => console.log(error.error)
    )
  }

  get400VaildationError() {
    this.http.post('https://localhost:5001/api/account/register', {}).subscribe(
      res => console.log(res),
      error => {
        console.log('xxx=>',error);
        this.validationErrors = error;
      }
    )
  }

}
