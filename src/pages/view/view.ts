import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  results: any = [];
  data_object: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private alertCtrl: AlertController) {
    this.results = navParams.get('param1');
    //console.log(this.results);
    storage.get("tasks").then((val) => {
      this.data_object = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    //console.log(this.results);
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }


  delete(id) {
    //console.log(id);
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you SURE you want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            //console.log(this.data_object);
            for (var i = 0; i < this.data_object.data.length; i++) {
              if (this.data_object.data[i].time == id) {
                console.log('deleting ',this.data_object.data[i]);
                this.data_object.data.splice(i,1);
              }
            }
            for (var i = 0; i < this.results.length; i++){
              if (this.results[i].time == id){
                console.log('deleting ',this.results[i])
                this.results.splice(i,1);
              }
            }
            console.log(this.results);
            console.log(this.data_object);
            this.storage.set("tasks", this.data_object)
          }
        }
      ]
    });
    alert.present();
  }

  goToSearch() {
    this.navCtrl.popToRoot();
  }

  deleteAll() {
    console.log('results:');
    console.log(this.results);
    for (var i = 0; i < this.results.length; i++) {
      console.log(this.results[i])
    }
    console.log('data:');
    console.log(this.data_object);

let alert = this.alertCtrl.create({
      title: 'Confirm Delete All',
      message: 'Are you SURE you want to delete ALL of the listed tasks?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete All',
          handler: () => {
            console.log('Delete clicked');
            //console.log(this.data_object);

            // delete all results from data
            for (var i = 0; i < this.results.length; i++){
              for (var j = 0; j < this.data_object.data.length; j++){
                if (this.data_object.data[j].time == this.results[i].time){
                  this.data_object.data.splice(j,1);
                }
              }
            }

            // clear results
            this.results = [];

            console.log(this.results);
            console.log(this.data_object);
            this.storage.set("tasks", this.data_object)
          }
        }
      ]
    });
    alert.present();
  } //End deleteAll
}
