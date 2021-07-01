import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController} from '@ionic/angular';
import { StorageService, Activity } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  totalExpences: number
  activities: Activity[] = []

  constructor(private router: Router,
    private storageService: StorageService, 
    private plt: Platform,
    private toastController: ToastController) {
      this.totalExpences = 0
      this.plt.ready().then(() => {
        this.loadActivities();
        this.calculateTotal()
      })
  }
  

  goToAdd() {
    this.router.navigate(["add-activity"])
  }

  calculateTotal(): number {
    console.log("TOTAL: "+ this.totalExpences)
    this.activities.forEach(a => {
      console.log("Amount: " + a.amount)
      this.totalExpences += a.amount;
      console.log("total: " + this.totalExpences)
    })
    return this.totalExpences
  }


  loadActivities() {
    this.storageService.getActivity().then(activities => {
      this.activities = activities;
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.loadActivities()
      this.calculateTotal()
      event.target.complete();
    }, 2000);
  }
}
