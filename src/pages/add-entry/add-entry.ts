import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {

  data_object:any;

  //write class, in new folder 'module' module.ts and import on to other pages instead of any
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    console.log("addentry_page_here");
    //    this.storage.get('data').then((data) => {
    //  if(data != null){
    //    this.data_object = JSON.parse(data);
    //  }
      //this.data_object = JSON.parse(data);
    //});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }

  goToHome(){
    this.navCtrl.pop();
  }

}
