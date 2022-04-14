import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccordionTypes } from 'src/app/enums/accordion-types.enum';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  readonly EVENT_INFO = AccordionTypes.EVENT_INFO;
  readonly ADD_PARTICIPANTS = AccordionTypes.ADD_PARTICIPANTS;
  readonly ADD_SPENDING = AccordionTypes.ADD_SPENDING;
  readonly PER_PERSON_SPLIT = AccordionTypes.PER_PERSON_SPLIT;
  readonly SUMMARY = AccordionTypes.SUMMARY;

  isEventInfoOpen: boolean = true;
  isAddParticipantOpen: boolean = false;
  isAddSpendingOpen: boolean = false;
  isSummaryOpen: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  onAccordionStateClick(e: any) {
    // console.log(e)
  }

  onEventInfoAdded(): void {
    this.isEventInfoOpen = false;
    this.isAddParticipantOpen = true;
    this.isAddSpendingOpen = false;
    this.isSummaryOpen = false;
  }

  onGoToHome(): void {
    this.router.navigate(['/'])
  }
}
