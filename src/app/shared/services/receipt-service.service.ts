import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { EventI } from 'src/app/interfaces/event.interface';

@Injectable()
export class ReceiptServiceService {

    private subject = new Subject<EventI>();

    constructor() { }

    print(id: EventI) {
        this.subject.next(id);
    }

    printSub(): Observable<EventI> {
        return this.subject.asObservable();
    }

}  