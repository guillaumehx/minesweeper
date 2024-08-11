import { Injectable } from '@angular/core';

const key: string = "GAME_HISTORY";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  insert(record: any): void {
    let history: string | null = this.get(key);
    if (history === null) {
      localStorage.setItem(key, JSON.stringify(new Array(record)));
    } else {
      let historyAsArray = JSON.parse(history);
      historyAsArray.push(record);
      localStorage.setItem(key, JSON.stringify(historyAsArray));
    }
  }

  private get(key: string): string | null {
    return localStorage.getItem(key);
  }

  getHistory(): Array<any> {
    let history: string | null = this.get(key);
    if (history === null) {
      return [];
    } else {
      return JSON.parse(history);
    }
  }

}