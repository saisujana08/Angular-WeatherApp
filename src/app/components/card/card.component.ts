import { Component, Input } from '@angular/core';
import { dataService } from 'src/app/services/data.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class cardComponent {
  City!:String;
  Temp!:String;
  Ci!:String;
  spin:boolean=true;
  faSpinner=faSpinner;
  error:boolean=false;

  cityForm= new FormGroup({
    cityName:new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])

  })


  constructor(private servic: dataService){
  }

  handleClimate() {
    this.spin=true;
    this.servic.getWeather(this.City).subscribe(data => {
      this.Temp = String(data.main.temp).split(".")[0];
       this.Ci = data.name;
       this.spin=false;
       this.error=false;
    },error => {this.error= true;this.spin=false})
  }
  
}
