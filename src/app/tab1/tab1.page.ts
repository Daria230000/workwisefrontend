import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonItem, IonTitle, IonContent, IonCheckbox, IonButton, IonLabel, IonInput, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchCircle, search, person, mail, lockClosed, logoInstagram, logoFacebook, logoLinkedin } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCheckbox,
    IonButton,
    IonLabel,
    FormsModule,  // Ensure FormsModule is imported here
    IonItem,
    IonInput,
    IonIcon,
    CommonModule
  ],
})
export class Tab1Page {
  email: string = '';
  labelFocused: boolean = false;
  checked: boolean = false;

  constructor(private router: Router) {
    addIcons({ searchCircle, search, person, mail, lockClosed, logoInstagram, logoFacebook, logoLinkedin });
  }

  async openInstagram() {
    const instagramUrl = 'https://www.instagram.com/workwise.ro?igsh=MWdhOGNrN2FnZWZ4Nw==';
    await Browser.open({ url: instagramUrl });
  }

  async openFacebook(){
    const facebookUrl ='https://www.facebook.com/profile.php?id=61574562338205';
    await Browser.open({url: facebookUrl});
  }

  navigateToTab2() {
    this.router.navigate(['tabs/tab2']);
  }
}
