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
}
