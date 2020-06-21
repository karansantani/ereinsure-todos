import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }

  checkPropertyExistence = (key: string): boolean => {
    if (this.localStorage.hasOwnProperty(key)) {
      return true;
    } else {
      return false;
    }
  }

  get = (key: string) => {
    if (this.isLocalStorageSupported && this.hasToken()) {
      return JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }

  set = (key: string, value: any) => {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  remove = (key: string) => {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('tasks');
  }
}
