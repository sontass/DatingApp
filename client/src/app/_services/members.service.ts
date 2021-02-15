import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member';
import { PaginateResult } from '../_model/pagination';
import { User } from '../_model/user';
import { UserParams } from '../_model/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient , private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    //console.log(Object.values(userParams).join('-'));
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return of(response);

    let params = this.getPaginationHeaders(userParams.pageNumber , userParams.pageSize);
    params = params.append('minAge' , userParams.minAge.toString());
    params = params.append('maxAge' , userParams.maxAge.toString());
    params = params.append('gender' , userParams.gender);
    params = params.append('orderyBy' , userParams.orderBy);
    return this.getPaginatedResult<Member[]>(this.baseUrl + 'Users', params).pipe(
      map( (res) => {
        this.memberCache.set(Object.values(userParams).join('-'), res);
        return res;
    }));
  }


  private getPaginatedResult<T>(url , params: HttpParams) {
    const pageinatedResult: PaginateResult<T> = new PaginateResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(res => {
        pageinatedResult.result = res.body;
        if (res.headers.get('Pagination') !== null) {
          pageinatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
        }
        return pageinatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number , pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }


  getMember(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
                    .reduce((arr,elem) => arr.concat(elem.result) , [])
                    .find((member: Member) => member.username === username);

    if(member) {
      return of(member);
    }
    console.log('member cache',member);
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

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'Likes/'+ username , {});
  }

  getLikes(predicate: string , pageNumber , pageSize) {
    let params = this.getPaginationHeaders(pageNumber ,pageSize);
    params = params.append('predicate',predicate);
    return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'Likes',params);
  }


}

