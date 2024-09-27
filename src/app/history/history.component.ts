import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage/storage.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'history',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf, TranslocoPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  history!: Array<any>;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.history = this.storageService.getHistory();
  }
}
