import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ViewPage } from '../view/view';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  data_object: any;
  results: any = [];
  Person: any = [];
  Task: any;
  Comment: any;
  StartDate: any;
  EndDate: any;
  PersonSet: any = new Set();
  TaskSet: any = new Set();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private alertCtrl: AlertController) {
    console.log("here");
    this.storage.get("tasks").then((val) => {
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
    console.log('ionViewDidLoad SearchPage');
  }

  goToHome() {
    this.navCtrl.pop();
    //console.log(this.StartDate);
    //console.log(new Date(this.StartDate).getTime() / 1000);
  }

  Search() {
    //Get Data and Set Data on Every visit
    this.storage.get("tasks").then((val) => {
      this.data_object = val;
    });
    this.results = [];

    // Check for Null Dates
    if (this.StartDate == null)
    { this.StartDate = 0; }
    else
    { this.StartDate = new Date(this.StartDate).getTime() };

    if (this.EndDate == null)
    { this.EndDate = Date.now(); }
    else
    { this.EndDate = new Date(this.EndDate).getTime() };


    for (var i = 0; i < this.data_object.data.length; i++) {
      var found = true;


      // Date Range Search
      if (this.data_object.data[i].time >= this.StartDate && this.data_object.data[i].time <= this.EndDate) {

        // Task Search
        if (this.Task != null) {
          if (this.Task != this.data_object.data[i].task)
            found = false;
        }

        // Person Search
        if (this.Person.length > 0) {
          var counter = 0;
          for (var j = 0; j < this.data_object.data[i].person.length; j++) {
            if (this.data_object.data[i].person[j] == this.Person) {
              counter++;
            }
          }
          if (counter == 0)
            found = false;
        }

        // Comment Search 
        // not working if comment is blank!!! must make if blank set to empty string!
        if (this.Comment != null) {
          if (!this.data_object.data[i].comment.includes(this.Comment))
            found = false;
        }
      }
      else
        found = false;

      if (found == true)
        this.results.push(this.data_object.data[i]);
    }

    // Error Checking If No Results Found
    if (this.results.length > 0) {
      this.navCtrl.push(ViewPage, { param1: this.results });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'No Results',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  } // end Search()


}
