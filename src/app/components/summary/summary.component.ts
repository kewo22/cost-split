import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { Spending } from 'src/app/interfaces/spending.interface';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';

import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import { addEvents } from 'src/app/store/events/events.action';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { initialEventState } from 'src/app/store/eventInfo.reducer';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  event: EventI | null = null;

  constructor(
    private store: Store
  ) {

    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      const clonedEvent: EventI = { ...event };
      const clonedSpending: Spending[] = [...event.spending];
      const updatedSpending = clonedSpending.map((spending: Spending) => ({
        ...spending,
        participants: this.getPerPersonCost(spending),

      }));
      clonedEvent.spending = [...updatedSpending];
      this.event = { ...clonedEvent };
    });

    if (this.event) {
      const clonedEvent: EventI = { ...this.event };
      const updatedParticipants = clonedEvent.participants.map((participant: Participant) => ({
        ...participant,
        cost: this.getParticipantCost(clonedEvent, participant)
      }));
      clonedEvent.participants = [...updatedParticipants];
      this.event = { ...clonedEvent };
    }


    if (this.event) {
      const clonedEvent: EventI = { ...this.event };
      const updatedParticipants = clonedEvent.participants.map((participant: Participant) => ({
        ...participant,
        due: this.getParticipantDue(participant)
      }));
      clonedEvent.participants = [...updatedParticipants];
      this.event = { ...clonedEvent };
    }
    console.log(this.event)


  }

  ngOnInit(): void {
  }

  getPerPersonCost(spending: Spending): Participant[] | null {
    if (spending.participants) {
      // const costPerParticipant = spending.cost / spending.participants?.length;
      const costPerParticipant = Math.ceil(spending.cost / spending.participants?.length);
      const clonedParticipants: Participant[] = [...spending.participants];
      const result: Participant[] = clonedParticipants.map(o => ({
        ...o,
        cost: costPerParticipant,
      }));
      return result;
    } else {
      return null;
    }
  }

  getParticipantCost(event: EventI, participant: Participant): number {
    let participantCost = 0;
    event.spending.forEach((spending: Spending) => {
      const foundParticipant = spending.participants?.find(obj => {
        return obj.id === participant.id
      });
      if (foundParticipant) {
        participantCost = participantCost + foundParticipant.cost;
      }
    });
    return participantCost;
  }

  getParticipantDue(participant: Participant): number {
    let participantDue = participant.alreadyPaid - participant.cost;
    return participantDue;
  }


  onGenerateSummaryImage(): void {

    if (this.event) {
      this.store.dispatch(addEvents({ events: [this.event] })) // all events push
      this.store.dispatch(addEventInfo(initialEventState));
    }

    // // debugger
    // var node = document.querySelector('#summary') as HTMLDivElement;

    // if (node) {
    //   htmlToImage.toPng(node, {
    //     // canvasHeight: 500,
    //     // canvasWidth: 400,
    //     // height: 1000,
    //     // width: 2000,
    //     // style: {
    //     //   width: '800px',
    //     //   height: '800px'
    //     // }
    //   })
    //     .then(function (dataUrl) {
    //       var img = new Image();
    //       img.src = dataUrl;

    //       if (node) node.appendChild(img);

    //       const downloadLink = document.createElement("a");
    //       downloadLink.href = dataUrl;
    //       downloadLink.download = 'fileName';
    //       downloadLink.click();
    //     })
    //     .catch(function (error) {
    //       console.error('oops, something went wrong!', error);
    //     });
    // }

  }

}
