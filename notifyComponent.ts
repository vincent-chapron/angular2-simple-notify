import {Component, OnInit, Input, Output} from '@angular/core'
import {Router} from '@angular/router'

import {NotifyService} from "./notifyService";
import {NotifyInterface} from "./notifyInterface";

@Component({
    selector: 'notify',
    template: `
<div [ngStyle]="_getStyle()">
    <div
        *ngFor="let n of notify"
        [hidden]="!n.active"
        [innerHtml]="n.content"
        class="alert alert-dismissible alert-{{n.type || type}}">
    </div>
</div>
`
})
export class NotifyComponent implements OnInit {
    constructor(protected _router: Router) {}

    @Input() timeout: number = 3000;
    @Input() position: string = "top right";
    @Input() type: string = "success";

    notify: NotifyInterface[];

    ngOnInit() {
        this._router.changes.subscribe(() => this._getNotify());
        NotifyService.timeout = this.timeout;
        this._getNotify();
    }

    protected _getNotify() {
        NotifyService.clearNotify();
        this.notify = NotifyService.getAllNotify();
    }

    protected _getStyle() {
        return {
            top:            (/^top|top$/.test(this.position)) ? '0' : '',
            bottom:         (/^bottom|bottom$/.test(this.position)) ? '0' : '',
            right:          (/^right|right$/.test(this.position)) ? '0' : '',
            left:           (/^left|left$/.test(this.position)) ? '0' : '',
            position:       'fixed',
            width:          '400px',
            'max-width':    '100vw',
            'z-index':      '5100',
        };
    };
}
