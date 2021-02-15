import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_model/member';
import { Pagination } from 'src/app/_model/pagination';
import { User } from 'src/app/_model/user';
import { UserParams } from 'src/app/_model/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value: 'male' , display: 'Males'} , {value: 'female' , display:'Female'}];

  constructor(private memberService: MembersService) {
    // this.accountService.currentUser$.pipe(take(1)).subscribe(
    //   user => {
    //     this.user = user;
    //     this.userParams = new UserParams(user);
    //   }
    // );

    this.userParams = this.memberService.getUserParams();

  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(
        (res: any) => {
          this.members = res.result;
          this.pagination = res.pagination;
        }
    )
  }

  resetFilters() {
    //this.userParams = new UserParams(this.user);
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any)
  {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

}
