import { Component, OnInit } from '@angular/core';
import { Users } from '../model/users';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-test',
  template: `
    <div class="container">
      <h1>employee list</h1>
      <nav class="navbar">
        <input
          class="form-control"
          type="text"
          name="firstName"
          [(ngModel)]="firstName"
          (ngModelChange)="search()"
          placeholder="enter First Name to search "
        />
      </nav>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" (click)="sort('id')">
              User Id &nbsp;<i class="fa fa-sort"></i>
            </th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="
              let user of users
                | orderBy: key:reverse
                | paginate: { itemsPerPage: 3, currentPage: p }
            "
          >
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.mobile }}</td>
            <td>{{ user.salary }}</td>
          </tr>
        </tbody>
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </table>
    </div>
  `,
  styles: [],
})
export class TestComponent implements OnInit {
  users: Users[] = [];
  firstName: any;
  p: number = 1;
  constructor(public ts: TestService) {}

  ngOnInit(): void {
    this.ts.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
  search() {
    if (this.firstName == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res) => {
        return res.firstName.toLowerCase().match(this.firstName.toLowerCase());
      });
    }
  }
  key: string = 'id';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
