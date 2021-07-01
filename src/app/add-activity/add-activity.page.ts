import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { StorageService, Activity } from '../services/storage.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  activities: Activity[] = []

  newActivity: Activity = <Activity>{}

  constructor(private router: Router, 
    private storageService: StorageService, 
    private plt: Platform,
    private toastController: ToastController) {
      this.plt.ready().then(() => {
        this.loadActivities();
      })
     }

  ngOnInit() {
    
  }

  addActivity() {
    this.newActivity.id = new Date().getMilliseconds()
    console.log("description: "+ this.newActivity.description)
    console.log("amount: "+ this.newActivity.amount)
    console.log("date: "+ this.newActivity.date)
    this.storageService.addAtivity(this.newActivity).then(activity => {
      this.newActivity = <Activity>{};
      this.loadActivities()
    })
    // console.log("activities: "+ this.activities.length)

    let navigationExras: NavigationExtras = {
      state: {
        activities : this.activities
      }
    }
    this.router.navigate(["home"], navigationExras)
  }

  loadActivities() {
    this.storageService.getActivity().then(activities => {
      this.activities = activities;
    })
  }
}
