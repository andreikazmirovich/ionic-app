import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private isSettingsChanged = false;
  public settings = this.firebaseService.settings;
  public loadingSpinner = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewCanLeave() {
    if (this.isSettingsChanged) {
      return new Promise((resolve, reject) => {
        this.loadingSpinner.present();
        this.firebaseService.saveSettings().subscribe(() => {
          this.loadingSpinner.dismiss().then(() => {
            resolve();
          });
        });
      });
    }
  }

  ionViewWillLeave(): void {
    //this.navCtrl.popToRoot();
  }

}
