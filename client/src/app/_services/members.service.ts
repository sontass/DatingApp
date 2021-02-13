import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    //https://localhost:5001/api/Users
    return this.http.put(this.baseUrl + 'Users' , member);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'Users/set-main-photo/' + photoId , {} )
  }

  deletePhoto(photoId: number) {
   return this.http.delete(this.baseUrl + 'Users/delete-photo/'+ photoId) ;
  }


}
