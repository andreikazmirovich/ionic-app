import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Question } from '../models/question.model';
import { Observable, Subject } from 'rxjs';
import { SingleSetting } from '../models/singleSetting.model';
import { Settings } from '../models/settings.model';

@Injectable()
export class FirebaseService {
  public user: any = {
    id: ''
  }
  private questions: AngularFirestoreCollection<Question>;
  public settings: SingleSetting[];
  
  constructor(public store: AngularFirestore) {
    this.questions = store.collection<Question>('questions');
  }

  public getQuestions(): Observable<Question[]> {
    return this.questions.valueChanges();
  }

  public addQuestions(text: string) {
    const newQuestion = new Question(this.store.createId(), text);
    this.questions.add({...newQuestion});
  }

  public installSettings(): void {
    this.store.collection<Settings>('settings', ref => ref.where('userId', '==', '')).valueChanges().subscribe(settings => {
      this.settings = settings[0].settings;
    });
  }

  public saveSettings(): Observable<any> {
    let saved = new Subject();
    this.store.collection<Settings>('settings', ref => ref.where('userId', '==', this.user.id)).get().subscribe(querySnapshot => {
      querySnapshot.docs[0].ref.update({settings: this.settings});
      saved.next();
    });
    return saved;
  }
  
}