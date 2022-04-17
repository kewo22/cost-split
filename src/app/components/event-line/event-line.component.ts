import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { ReceiptServiceService } from 'src/app/shared/services/receipt-service.service';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { removeEvents } from 'src/app/store/events/events.action';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-event-line',
  templateUrl: './event-line.component.html',
  styleUrls: ['./event-line.component.scss']
})
export class EventLineComponent implements OnInit {

  // @Output() OnView = new EventEmitter();
  // @Output() OnDownload = new EventEmitter();
  // @Output() OnView = new EventEmitter();

  @Input() event: EventI | null = null;
  isDialogOpen: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private receiptServiceService: ReceiptServiceService,
  ) { }

  ngOnInit(): void {
  }

  onViewClick(): void {
    if (this.event) {
      this.store.dispatch(addEventInfo(this.event));
      this.router.navigate(['/event'])
    }
  }

  onDownloadClick(): void {
    if (this.event) this.receiptServiceService.print(this.event);
  }

  onDeleteClick(): void {
    this.isDialogOpen = true;
  }

  onDeleteConfirm(): void {
    if (this.event) {
      this.store.dispatch(removeEvents({ events: [this.event] }));
      this.isDialogOpen = false;
    }
  }

}
