import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase-service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public showedQuestions: Question[];
  private questions: Question[];

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.firebaseService.getQuestions().subscribe(questions => {
      if (!this.showedQuestions) {
        this.showedQuestions = questions;
      }
      this.questions = questions;
    });
    this.firebaseService.installSettings();
  }

  public isQuestionNew(question: Question): boolean {
    //const newTime = 600 // 10 minutes in seconds
    const difference = Math.floor(Date.now() / 1000) - question.created.seconds;
    return difference < 600;
  }

  public shouldUserRefreshPage(): boolean {
    return this.showedQuestions !== this.questions;
  }

  public getNewQuestions(): void {
    this.showedQuestions = this.questions;
  }

}
