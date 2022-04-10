import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Spending } from 'src/app/interfaces/spending.interface';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AssignParticipantComponent } from '../assign-participant/assign-participant.component';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';
import { addEventInfo } from 'src/app/store/eventInfo.action';

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.scss']
})
export class AddSpendingComponent implements OnInit {

  @ViewChild("input") costInputField: any | null = null;

  item: string = '';
  cost: number | undefined;

  event: EventI | null = null;
  addParticipantsTo: Spending | null = null;

  private dialog: any;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      this.event = event;
    })
  }

  onAddClick(): void {
    if (this.cost && this.item && this.event) {
      const clonedEvent = { ...this.event };
      const id = +(Date.now() + ((Math.random() * 100000).toFixed()));
      const spending: Spending = {
        item: this.item,
        cost: this.cost,
        id: id,
        participants: null
      }
      const clonedSpending = [...clonedEvent.spending];
      clonedSpending.push(spending);
      clonedEvent.spending = [...clonedSpending];
      this.store.dispatch(addEventInfo(clonedEvent));
      this.cost = undefined;
      this.item = '';
      if (this.costInputField) this.costInputField.elementRef.nativeElement.focus();
    }
  }

  initAssignParticipantDialog(): void {
    this.dialog = this.dialogService.open<Spending>(
      new PolymorpheusComponent(AssignParticipantComponent, this.injector),
      {
        data: this.addParticipantsTo,
        dismissible: true,
        label: `Add Participants to ${this.addParticipantsTo?.item}`,
        // size: 'fullscreen'
      },
    );
  }

  onAddParticipantClick(spending: Spending): void {
    this.addParticipantsTo = { ...spending };
    this.initAssignParticipantDialog();
    this.dialog.subscribe({
      next: (spending: Spending) => {
        this.addParticipantToSpending(spending);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  addParticipantToSpending(spending: Spending): void {
    if (this.event) {
      const clonedEvent = { ...this.event };
      const clonedSpending = [...clonedEvent.spending];
      const foundSpendingIndex = clonedSpending.findIndex(clonedSpending => {
        return clonedSpending.id === spending.id;
      });
      if (foundSpendingIndex !== -1) {
        clonedSpending.splice(foundSpendingIndex, 1, spending);
        clonedEvent.spending = [...clonedSpending];
        this.store.dispatch(addEventInfo(clonedEvent))
      }
    }
  }

  onRemoveSpendingClick(spending: Spending): void {
    if (this.event) {
      const clonedEvent = { ...this.event };
      const clonedSpending = [...clonedEvent.spending];
      const foundSpendingIndex = clonedSpending.findIndex(clonedSpending => {
        return clonedSpending.id === spending.id;
      });
      if (foundSpendingIndex !== -1) {
        clonedSpending.splice(foundSpendingIndex, 1);
        clonedEvent.spending = [...clonedSpending];
        this.store.dispatch(addEventInfo(clonedEvent))
      }
    }
  }

}
