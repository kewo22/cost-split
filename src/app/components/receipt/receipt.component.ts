import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EventI } from 'src/app/interfaces/event.interface';
import { ReceiptServiceService } from 'src/app/shared/services/receipt-service.service';
import { SummaryCalculateService } from 'src/app/shared/services/summary-calculate-service.service';
import { selectEventById } from 'src/app/store/events/event.selector';
import * as htmlToImage from 'html-to-image';
// import { toPng } from 'html-to-image';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  event: EventI | null = null;

  constructor(
    private receiptServiceService: ReceiptServiceService,
    private store: Store,
    private summaryCalculateService: SummaryCalculateService
  ) {

    this.receiptServiceService.printSub()
      .subscribe((event) => {
        if (event) {
          const tempEvent = this.summaryCalculateService.calculate(event);
          this.event = { ...tempEvent };
          setTimeout(() => {
            if (this.event) this.download(this.event);
          }, 1);
        }
      });

  }

  ngOnInit(): void { }

  download(event: EventI) {
    const node = document.querySelector('#receipt-wrapper') as HTMLDivElement;
    if (node) {
      htmlToImage.toPng(node, {
        backgroundColor: "#ffffff",
        // canvasHeight: 500,
        // canvasWidth: 400,
        // height: 1000,
        // width: 2000,
        // style: {
        //   width: '800px',
        //   height: '800px'
        // }
      })
        .then(function (dataUrl) {
          // var img = new Image();
          // img.src = dataUrl;
          // if (node) {
          //   node.appendChild(img);
          // }
          const downloadLink = document.createElement("a");
          downloadLink.href = dataUrl;
          downloadLink.download = event.name;
          downloadLink.click();
          downloadLink.remove();
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  }

}
