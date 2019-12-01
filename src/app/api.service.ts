import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public mobileWidthTrigger = 750;
  public mobileHeightTrigger = 600;
  public mediumWidthTrigger = 1020;

  public isMobileWatcher: boolean = window.innerWidth <= this.mobileWidthTrigger || window.innerHeight <= this.mobileHeightTrigger;
  public isMobile = new Subject<boolean>();
  public isMediumWatcher: boolean = !this.isMobileWatcher && window.innerWidth <= this.mediumWidthTrigger;
  public isMedium = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {

    window.addEventListener('resize', ev => {

      this.isMobileWatcher = window.innerWidth <= this.mobileWidthTrigger || window.innerHeight <= this.mobileHeightTrigger;
      this.isMediumWatcher = !this.isMobileWatcher && window.innerWidth < this.mediumWidthTrigger;
      this.isMobile.next(this.isMobileWatcher);
      this.isMedium.next(this.isMediumWatcher);
    });
  }

  public downloadFile(url: string): void {

    this.http.get('https://wesprodev.com/' + url, { responseType: 'blob' })
      .toPromise()
      .then(blob => {
        saveAs(blob, 'MambaFi-Setup.exe');
      })
      .catch(err => {
        console.log('Download Error: ' + err);
      })
  }
}
