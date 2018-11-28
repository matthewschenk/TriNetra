import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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

  data_object: any;
  Person: any = [];
  Task: any;
  Comment: any;
  NewPerson: any;
  PersonSet: any = new Set();
  TaskSet: any = new Set();


  //write class, in new folder 'module' module.ts and import on to other pages instead of any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private alertCtrl: AlertController) {
    console.log("addentry_page_here");
    //    this.storage.get('data').then((data) => {
    //  if(data != null){
    //    this.data_object = JSON.parse(data);
    //  }
    //this.data_object = JSON.parse(data);
    //});
    storage.get("tasks").then((val) => {
      this.data_object = val;

      for (var i = 0; i < this.data_object.data.length; i++) {
        this.TaskSet.add(this.data_object.data[i].task)
        for (var j = 0; j < this.data_object.data[i].person.length; j++) {
          this.PersonSet.add(this.data_object.data[i].person[j])
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }

  goToHome() {
    this.navCtrl.pop();
  }

  SaveEntry() {
    // Adds One New Person to Person List
    if (this.NewPerson != null) {
      this.Person.push(this.NewPerson);
    }

    // Error Checking and Save
    if (!this.Person || !this.Task) {
      let alert = this.alertCtrl.create({
        title: 'Empty Task or Person Fields',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else {
      if (this.Comment == null)
        this.Comment = "";
      this.data_object.data.push({
        "time": Date.now(), "task": this.Task,
        "person": this.Person, "comment": this.Comment
      });
      console.log(this.data_object);
      this.storage.set("tasks", this.data_object)
      let alert = this.alertCtrl.create({
        title: 'Task Saved',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.pop();
    }
  }

}
