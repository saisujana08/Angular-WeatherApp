import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dataService {

  constructor(private http:HttpClient) { }

  getWeather(city: String): Observable<any>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a1ac47818feac7ec283e7b680fe7e0fa`
    return this.http.get(url);
  }
  getLocation(latitude: number, longitude: number): Observable<any>{
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a1ac47818feac7ec283e7b680fe7e0fa`
    const url ="https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=a1ac47818feac7ec283e7b680fe7e0fa"
    return this.http.get(url);
  }
  getWeeklyData(city:String): Observable<any>{
    const url = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=d4c6ca7fdf1c4c9e9af60916231505&q=${city}&num_of_days=7&format=json`
    return this.http.get(url);
  }
  getUserLocWeeklyData(latitude: number, longitude: number): Observable<any>{
    const url = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=d4c6ca7fdf1c4c9e9af60916231505&q=${latitude},${longitude}&num_of_days=7&format=json`
    return this.http.get(url);
  }
}



