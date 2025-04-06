import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ Importă IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true, // ✅ Important pentru standalone components
  imports: [IonicModule, CommonModule, FormsModule] // ✅ Importă IonicModule
})
export class DashboardPage {}
