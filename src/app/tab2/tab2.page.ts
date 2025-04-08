import { Component, NgModule } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonSearchbar, IonInput, IonItem, IonList, IonLabel, IonCheckbox, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchCircle, search, person, mail, lockClosed, logoInstagram, logoFacebook, logoLinkedin } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonSearchbar,
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon
  ],
})
export class Tab2Page {
  email: string = '';
  labelFocused: boolean = false;

  constructor(private router: Router) {
    addIcons({  searchCircle, search, person, mail, lockClosed, logoInstagram, logoFacebook, logoLinkedin });
  }

  async openInstagram() {
    const instagramUrl = 'https://www.instagram.com/workwise.ro?igsh=MWdhOGNrN2FnZWZ4Nw==';
    await Browser.open({ url: instagramUrl });
  }

  async openFacebook(){
    const facebookUrl ='https://www.facebook.com/profile.php?id=61574562338205';
    await Browser.open({url: facebookUrl});
  }

  navigateToTab2(){
    this.router.navigate(['tabs/tab1']);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppComponent, // Import AppComponent if standalone
  ],
  providers: [],
  //bootstrap: [AppComponent], // Bootstrap the standalone component
})
export class AppModule {}
