import { Component , Input} from '@angular/core';
import { dataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherApp-angular';
  temp!: String;
  city!: String;
  constructor(private servic: dataService) {}

  handleButton(city: String) {
    this.servic.getWeather(city).subscribe(response => {
      this.temp = response.main.temp;
      this.city = response.name;
    });
  }
}
