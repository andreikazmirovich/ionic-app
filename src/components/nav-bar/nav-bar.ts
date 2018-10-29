import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase-service';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../../pages/settings/settings';

/**
 * Generated class for the NavBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html'
})
export class NavBarComponent {

  public question = '';
  public isOpen = false;
  public isSendButtonDisabled = true;

  constructor(
    private firebaseService: FirebaseService,
    private navCtrl: NavController  
  ) {}

  public sendQuestion(): void {
    this.firebaseService.addQuestions(this.question);
    this.question = '';
    this.isOpen = false;
  }

  public isAnswerCorrect(): void {
    this.isSendButtonDisabled = !(/^[\w .,_\-\?\!]{1,100}$/.test(this.question));
  }

  public goToSettings(): void {
    this.navCtrl.push(SettingsPage);
  }
}
