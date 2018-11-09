import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddEntryPage } from "../add-entry/add-entry";
import { SearchPage } from "../search/search";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data_object:any;

  constructor(public navCtrl: NavController, private storage: Storage) {
    console.log("here");
    //this.storage.set('data','fghfghd');
    //this.storage.get('data').then((data) => {
     // if(data != null){
       // this.data_object = JSON.parse(data);
      //}
      //this.data_object = JSON.parse(data);
    //});
  }
  goToAddEntry(){
    this.navCtrl.push(AddEntryPage);
    // make this object json, and save it to data in addentry page JSON.stringify storage set
  }

  goToSearch(){
    this.navCtrl.push(SearchPage);
  }

}
