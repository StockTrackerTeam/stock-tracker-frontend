import { FormControl, Validators } from '@angular/forms';

export class UserCreateDTO {
    username!: string;
    password!: string;
    confirmPassword!: string;
    firstName!: string;
    email!: string;
    confirmEmail!: string;
    roleId!: number;
}