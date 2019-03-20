import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, NavController } from '@ionic/angular';
import {
  LocalNotifications,
  ELocalNotificationTriggerUnit,
  ILocalNotificationActionType,
  ILocalNotification
} from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage implements OnInit {
  scheduled = [];
  time: string;
  hours: number;
  minutes: number;
  constructor(
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.plt.ready().then(() => {
      // this.localNotifications.on('click').subscribe(res => {
      //   const msg = res.data ? res.data.mydata : '';
      //   this.showAlert(res.title, res.text, msg, res.actions);
      // });

      // if the notification is triggered => display alert
      this.localNotifications.on('trigger').subscribe(res => {
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg, res.actions);
      });

      // create action group for notifications
      this.localNotifications.addActions('yes-no', [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]);
      // if user clicks the 'yes' button => take the user to home page
      this.localNotifications.on('yes').subscribe(res => {
        this.navCtrl.navigateRoot('/');
      });

      // if user clicks the 'no' button => clear the notification
      this.localNotifications.on('no').subscribe(res => {
        this.localNotifications.clear(1);
      });
    });
  }

  ngOnInit() {}

  scheduleNotification() {
    //   // this.localNotifications.schedule({
    //   //   id: 1,
    //   //   title: 'Attention',
    //   //   text: 'Simons Notification',
    //   //   data: { mydata: 'My hidden message this is' },
    //   //   trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    //   //   foreground: true // Show the notification while app is open
    //   // });

    this.localNotifications.schedule({
      id: 1,
      title: 'Test',
      text:
        'Your outfit of the day is waiting for you, would you like to see it?',
      actions: 'yes-no',
      trigger: { at: new Date(new Date().getTime() + 20 * 1000) },
      foreground: true // Show the notification while app is open
    });
  }

  repeatingDaily() {
    if (this.time !== undefined) {
      this.hours = Number(this.time.split(':')[0]);
      this.minutes = Number(this.time.split(':')[1]);
      this.localNotifications.schedule({
        id: 42,
        title: 'Daily outfit',
        text:
          'Your outfit of the day is waiting for you, would you like to see it?',
        actions: [{ id: 'yes', title: 'Yes' }, { id: 'no', title: 'No' }],
        trigger: { every: { hour: this.hours, minute: this.minutes } }
      });
    }
  }

  showAlert(header, sub, msg, buttons) {
    this.alertCtrl
      .create({
        header: header,
        subHeader: sub,
        message: msg,
        buttons: buttons
      })
      .then(alert => alert.present());
  }

  getAll() {
    this.localNotifications.getAll().then((res: ILocalNotification[]) => {
      this.scheduled = res;
    });
  }

  cancelNotifications() {
    this.localNotifications.cancelAll();
  }

  printTime() {
    console.log(typeof this.time, this.time, this.time.split(':'));
  }

}
