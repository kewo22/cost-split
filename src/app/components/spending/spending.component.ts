import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spending } from 'src/app/interfaces/spending.interface';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss']
})
export class SpendingComponent implements OnInit {

  @Input() spending: Spending | null = null;

  @Output() onAddParticipant = new EventEmitter<Spending>();
  @Output() onRemoveSpending = new EventEmitter<Spending>();

  badgeContent: string | number = '';

  constructor() { }

  ngOnInit(): void {
    this.badgeContent = this.spending && this.spending.participants && this.spending.participants.length ? this.spending.participants.length : 'tuiIconPlus';
  }

  onAvatarClick(): void {
    if (this.spending)
      this.onAddParticipant.emit(this.spending);
  }

  onRemoveSpendingClick(): void {
    if (this.spending)
      this.onRemoveSpending.emit(this.spending);
  }

}
