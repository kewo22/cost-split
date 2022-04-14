import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { addEventInfo } from 'src/app/store/eventInfo.action';

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

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  onViewClick(): void {
    if (this.event) {
      this.store.dispatch(addEventInfo(this.event));
      this.router.navigate(['/event'])
    }
    // if (this.event) this.OnView.emit(this.event)
  }

  onDownloadClick(): void {
    // if (this.event) this.OnView.emit(this.event)
  }

  onDeleteClick(): void {
    // if (this.event) this.OnView.emit(this.event)
  }

}
