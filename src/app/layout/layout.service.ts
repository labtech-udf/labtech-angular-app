import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _progressVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  showProgressBar(): void {
    this._progressVisible$.next(true);
  }
  hideProgressBar(): void {
    this._progressVisible$.next(false);
  }

  get progressVisible$(): Observable<boolean> {
    return this._progressVisible$.asObservable();
  }

}
