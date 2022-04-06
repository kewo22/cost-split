import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, startWith, withLatestFrom } from 'rxjs/operators';

import { TuiMobileCalendarDialogComponent } from '@taiga-ui/addon-mobile';
import { TuiDay, tuiReplayedValueChangesFrom } from '@taiga-ui/cdk';
import { TUI_MONTHS, TuiDialogService } from '@taiga-ui/core';
import { TUI_CALENDAR_DATA_STREAM } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { addEventInfo } from 'src/app/store/eventInfo.action';
import { EventI } from 'src/app/interfaces/event.interface';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EventInfoComponent implements OnInit {

  readonly eventInformationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  private readonly eventDateControl = new FormControl(new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

  private readonly dialog$: Observable<TuiDay>;

  readonly date$ = this.eventDateControl.valueChanges.pipe(
    startWith(this.eventDateControl.value),
    withLatestFrom(this.months),
    map(([value, months]) => this.getParsed(value, months)),
  );

  constructor(
    @Inject(TuiDialogService) dialogService: TuiDialogService,
    @Inject(Injector) injector: Injector,
    @Inject(TUI_MONTHS) private readonly months: Observable<string[]>,
    private store: Store
  ) {
    const dataStream = tuiReplayedValueChangesFrom(this.eventDateControl);
    const computedInjector = Injector.create({
      providers: [
        {
          provide: TUI_CALENDAR_DATA_STREAM,
          useValue: dataStream,
        },
      ],
      parent: injector,
    });

    const content = new PolymorpheusComponent(
      TuiMobileCalendarDialogComponent,
      computedInjector,
    );

    this.dialog$ = dialogService.open(content, {
      size: 'fullscreen',
      closeable: false,
      data: {
        // min: TuiDay.currentLocal(),
      },
    });
  }

  ngOnInit(): void {

    this.store.select(selectEventInfo).subscribe((eventInfo: EventI) => {
      this.eventInformationForm.controls['name'].setValue(eventInfo.name)
      this.eventInformationForm.controls['location'].setValue(eventInfo.location)
    })

  }

  get empty(): boolean {
    return !this.eventDateControl.value;
  }

  getParsed(value: TuiDay, months: string[]): string {
    if (!value) { return 'Choose a date'; }
    const { month, day, year } = value as TuiDay;
    this.eventInformationForm.controls['date'].setValue(new Date(year, month, day))
    return `${months[month]} ${day}, ${year}`;
  }

  onClick() {
    this.dialog$.subscribe(value => {
      this.eventDateControl.setValue(value);
    });
  }

  onSubmit() {
    const eventInfo: EventI = {
      date: this.eventInformationForm.value.date,
      location: this.eventInformationForm.value.location,
      name: this.eventInformationForm.value.name
    }
    this.store.dispatch(addEventInfo(eventInfo))
  }

}