export class UserCreateDTO {
    username!: string;
    password!: string;
    confirmPassword!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    confirmEmail!: string;
    roleId!: number;
}