import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IncomeExpense } from '../models/income-expense.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  constructor(private firestore: AngularFirestore) {}

  initIncomeExpenseListener(uid: string) {
    return this.firestore.collection<User>('users').doc(uid).collection('items')
      .snapshotChanges()
      .pipe(
        // transform snapshots with map operator
        map((snapshot) => {
          // returns IncomeExpense[]
          return snapshot.map((doc) => {
            // for each doc returns (add) an object as an IncomeExpense
            return {
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as IncomeExpense),
            };
          });
        })
      );
  }

  createIncomeExpense(incomeExpense: IncomeExpense, uid: string) {
    return this.firestore.collection<User>('users').doc(uid)
      .collection('items')
      .add(incomeExpense);
  }

  deleteIncomeExpense(userId: string, itemId: string) {
    return this.firestore.collection<User>('users').doc(userId).collection('items').doc(itemId).delete();
  }
}
