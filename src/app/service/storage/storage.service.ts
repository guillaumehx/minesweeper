import { Injectable } from '@angular/core';
import { HistoryRecord } from '../../utils/types';
import { TranslocoService } from '@jsverse/transloco';

const historyKey: string = 'GAME_HISTORY';
const languageKey: string = 'LANGUAGE';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private translocoService: TranslocoService) {}

  insertHistoryRecord(record: HistoryRecord): void {
    let history: string | null = this.get(historyKey);
    if (history === null) {
      localStorage.setItem(historyKey, JSON.stringify(new Array(record)));
    } else {
      let historyAsArray = JSON.parse(history);
      historyAsArray.unshift(record);
      localStorage.setItem(historyKey, JSON.stringify(historyAsArray));
    }
  }

  private get(key: string): string | null {
    return localStorage.getItem(key);
  }

  getHistory(): Array<HistoryRecord> {
    let history: string | null = this.get(historyKey);
    if (history === null) {
      return [];
    } else {
      return JSON.parse(history);
    }
  }

  getLanguage(): string {
    let language: string | null = this.get(languageKey);
    if (language == null) {
      language = 'en';
    }
    if (
      !(this.translocoService.getAvailableLangs() as string[]).includes(
        language,
      )
    ) {
      language = 'en';
    }
    return language;
  }

  setLanguage(language: string) {
    localStorage.setItem(languageKey, language);
  }
}
