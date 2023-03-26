import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor (
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.usersList = data;
      },
      error: err => this.errorMessage = err
    });
  }

  handleNewUser() {
    console.log('New User');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
