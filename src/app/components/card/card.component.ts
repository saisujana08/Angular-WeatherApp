import { Component, Input, OnInit } from '@angular/core';
import { dataService } from 'src/app/services/data.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pluck, map } from 'rxjs'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class cardComponent {

  Temp!: String;
  Ci!: String;
  spin: boolean = true;
  faSpinner = faSpinner;
  error: boolean = false;
  weekTemp: number[] = [];
  dates: number[] = [];



  cityForm = new FormGroup({
    cityName: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')])

  })

  graphDisplay(): void {
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        datasets: [{
          label: 'Temperature',
          data: this.weekTemp,
          backgroundColor: "rgb(115 185 243 / 65%)",
          borderColor: "#007ee7",
          fill: true,
        }],
        labels: this.dates
      },
    });

  }


  constructor(private servic: dataService) {
    navigator.geolocation.watchPosition(function (position) {
      console.log();
    },
      (error) => {
        if (error.code == error.PERMISSION_DENIED) {
          this.handleClimate("visakhapatnam")
        }

      });
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(loc => {
        this.servic.getLocation(loc.coords.latitude, loc.coords.longitude).subscribe(

          detail => {
            this.Temp = String(detail.main.temp).split(".")[0];
            this.Ci = detail.name;
            this.spin = false;
            this.error = false;
          }

          , err => {
            this.spin = false;
            this.error = true;
          },



        )

        this.servic.getUserLocWeeklyData(loc.coords.latitude, loc.coords.longitude).pipe(
          pluck("data"),
          pluck("weather"),
        ).subscribe(detail => {
          for (let i = 0; i < detail.length; i++) {
            this.weekTemp.push(detail[i].maxtempC)
            this.dates.push(detail[i].date)
          }
          this.graphDisplay()
          this.weekTemp = []
          this.dates = []


        })
      }
      )
    }

  }

  handleClimate(city: String) {
    this.spin = true;
    this.servic.getWeather(city).subscribe(data => {
      this.Temp = String(data.main.temp).split(".")[0];
      this.Ci = data.name;
      this.spin = false;
      this.error = false;
    }, error => { this.error = true; this.spin = false })

    this.servic.getWeeklyData(city).pipe(
      pluck("data"),
      pluck("weather"),

    ).subscribe(weekData => {
      for (let i = 0; i < weekData.length; i++) {
        this.weekTemp.push(weekData[i].maxtempC)
        this.dates.push(weekData[i].date)
      }
      console.log(this.weekTemp)
      if (!this.error) {
        this.graphDisplay()
      }
      this.weekTemp = []
      this.dates = []


    })

  }


}
