import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // private prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Thema do navegador 

  private backgroundSubject = new BehaviorSubject<string>('null');
  public background$ = this.backgroundSubject.asObservable();


  constructor() { }


  setBackground(value: string): void {
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      sessionStorage.setItem('background', value);
    }
    this.backgroundSubject.next(value);
  }

  getBackgroundValue(): string {
    return this.backgroundSubject.getValue();
  }

  backgroundStored() {
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      const value = sessionStorage.getItem('background');
      this.backgroundSubject.next(value ? value : '#FFF');
    }
  }

}
