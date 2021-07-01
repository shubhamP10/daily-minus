import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Activity {
  id: Number,
  description: String,
  amount: number,
  date: Date
}

const ACTIVITY_KEY = "my-activities";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
   }

   async ngOnInit() {
    await this.storage.create();
   }

  // Create
  addAtivity(activity : Activity): Promise<any> {
    console.log("service Description: "+activity.id)
    return this.storage.get(ACTIVITY_KEY).then((activities: Activity[]) => {
      console.log("List: "+activities)
      if(activities) {
        activities.push(activity)
        return this.storage.set(ACTIVITY_KEY, activities)
      } else {
        return this.storage.set(ACTIVITY_KEY, [activity])
      }
    })
  }

  // Read
  async getActivity(): Promise<Activity[]> {
    return await this.storage.get(ACTIVITY_KEY)
  }

  // Update
  updateActivity(activity : Activity): Promise<any> {
    return this.storage.get(ACTIVITY_KEY).then((activities: Activity[]) => {
      if(!activities || activities.length === 0) {
        return null
      }

      let newActivities: Activity[] = []

      for(let a of activities) {
        if(a.id === activity.id) {
          newActivities.push(activity)
        } else {
          newActivities.push(a)
        }
      }
      
      return this.storage.set(ACTIVITY_KEY, newActivities)
    })
  }

  // Delete
  deleteActivity(id : Number): Promise<Activity> {
    return this.storage.get(ACTIVITY_KEY).then((activities: Activity[]) => {
      if(!activities || activities.length === 0) {
        return null
      }

      let toKeep: Activity[] = []

      for(let a of activities) {
        if(a.id !== id) {
          toKeep.push(a)
        }
      }

      return this.storage.set(ACTIVITY_KEY, toKeep)
    })
  }
}
