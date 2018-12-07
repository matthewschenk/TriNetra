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

  // Variable Declarations
  data_object:any;

  // Construct, always grabs the most recent data, if there is no data,
  // then the data file is empty
  constructor(public navCtrl: NavController, private storage: Storage) {
    console.log("here");
    storage.get("tasks").then((val)=>{
      if (val == null)
      {
         var your_json_object = {"data": []};
         this.storage.set("tasks", your_json_object)
      }
      else
      {
        this.data_object = val;
      }
    });
    //this.storage.set('data','fghfghd');
    //this.storage.get('data').then((data) => {
     // if(data != null){
       // this.data_object = JSON.parse(data);
      //}
      //this.data_object = JSON.parse(data);
    //});
  }

  // goToAddEntry
  // This function accepts no parameters, and navigates to the Add Entry Page
  goToAddEntry(){
    //this.data_object.data.push({"time": Date.now(),"task": "meeting", "person": "Ali", "comment": "test"});
    //this.storage.set("tasks", this.data_object)
    this.navCtrl.push(AddEntryPage);
    // make this object json, and save it to data in addentry page JSON.stringify storage set
  }

  // goToSearch
  // This function accepts no parameters, and navigates to the Search Page
  goToSearch(){
    //this.storage.get("tasks").then((Val)=>{
      //console.log(Val);
    //})
    this.navCtrl.push(SearchPage);
  }

}
