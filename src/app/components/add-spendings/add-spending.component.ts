import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Spending } from 'src/app/interfaces/spending.interface';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AssignParticipantComponent } from '../assign-participant/assign-participant.component';
import { Store } from '@ngrx/store';
import { addSpending, updateSpending } from 'src/app/store/spending/spending.action';
import { selectSpending } from 'src/app/store/spending/spending.selector';

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.scss']
})
export class AddSpendingComponent implements OnInit {

  item: string = '';
  cost: number | undefined;

  addParticipantsTo: Spending | null = null;

  spendingList: Spending[] = [];

  private dialog: any;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectSpending).subscribe(spendingList => this.spendingList = [...spendingList]);
  }

  onAddClick(): void {
    if (this.cost && this.item) {
      const id = +(Date.now() + ((Math.random() * 100000).toFixed()));
      const spending: Spending = {
        item: this.item,
        cost: this.cost,
        id: id,
        participants: null
      }
      this.spendingList = [...this.spendingList, spending];
      this.store.dispatch(addSpending(spending));
    }
  }

  initAssignParticipantDialog() {
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
      next: (data: Spending) => {
        const foundIndex = this.spendingList.findIndex(obj => {
          return obj.id === data.id;
        });
        if (foundIndex !== -1) {
          this.spendingList.splice(foundIndex, 1, data);
          this.store.dispatch(updateSpending(data));
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

}
