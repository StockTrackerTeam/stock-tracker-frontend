import { ChangeDetectorRef, Component } from '@angular/core';
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
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.userService.getUsers().pipe(
      tap(data => {
        this.usersList = data;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      })
    ).subscribe({
      next: noop,
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
