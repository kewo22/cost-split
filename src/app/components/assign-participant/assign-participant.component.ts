import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiDialogContext } from '@taiga-ui/core';
import { Participant } from 'src/app/interfaces/participant.interface';
import { selectParticipant } from 'src/app/store/participant/participant.selector';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Spending } from 'src/app/interfaces/spending.interface';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';
import { EventI } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-assign-participant',
  templateUrl: './assign-participant.component.html',
  styleUrls: ['./assign-participant.component.scss']
})
export class AssignParticipantComponent implements OnInit {

  // participants: Participant[] = [];
  spending: Spending | null = null;

  selectAll: boolean = false;
  event: EventI | null = null;

  form = this.fb.group({
    participantsSelectAll: new FormControl(false),
    participants: this.fb.array([])
  });

  constructor(
    private store: Store,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Spending>,
    private fb: FormBuilder
  ) {

  }

  get participantsControls() {
    return this.form.controls["participants"] as FormArray;
  }

  ngOnInit(): void {
    if (this.context.data) this.spending = this.context.data;
    // this.store.select(selectParticipant).subscribe(participants => this.participants = [...participants]);

    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      // this.spendingList = event.spending;
      this.event = event;
    })

    if (this.event) {
      this.event.participants.forEach((participant, i) => {
        if (this.spending && this.spending.participants && this.spending.participants.length) {
          const foundObj = this.spending.participants.find(obj => {
            return obj.id === participant.id;
          });
          if (foundObj) {
            this.participantsControls.push(new FormControl(true));
          } else {
            this.participantsControls.push(new FormControl(false));
          }
        } else {
          this.participantsControls.push(new FormControl(false));
        }
      })
    }

  }

  onSelectAllToggle(e: boolean): void {
    setTimeout(() => {
      const participantsFormArray: FormArray = this.form.get('participants') as FormArray;
      if (this.form.get('participantsSelectAll')?.value) {
        participantsFormArray.controls.forEach(control => {
          return control.setValue(true);
        })
      } else {
        participantsFormArray.controls.forEach(control => {
          return control.setValue(false);
        })
      }
    }, 1);
  }

  onSubmitClick(): void {
    if (this.spending) {
      const tempSpending: Spending = { ...this.spending };
      tempSpending.participants = [];
      this.participantsControls.controls.forEach((control, i) => {
        if (control.value && this.event) {
          tempSpending.participants?.push(this.event.participants[i]);
        }
      })
      this.spending = { ...tempSpending };
      this.context.completeWith(this.spending);
    }
  }

}
