import { IncomeExpense } from './income-expense.model';

export class User {
  uid?: string;
  email!: string;
  name!: string;

  static getUser({name, email, uid}: User) {
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.uid = uid;

    return newUser;
  }
}
