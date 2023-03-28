import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { noop, Subscription, tap } from 'rxjs';
import { UserEntity } from 'src/app/core/models/user-entity.model';
import { UserService } from 'src/app/core/rest/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersList: UserEntity[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  loading = false;

  constructor (
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.userService.getUsers().pipe(
      tap(data => {
        this.usersList = data;
        this.loading = false;
      })
    ).subscribe({
      next: noop,
      error: err => this.errorMessage = err
    });
  }

  handleNewUser() {
    this.router.navigate(['users', 'create']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
