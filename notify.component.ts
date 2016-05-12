import {Component, OnInit, Input, Output} from 'angular2/core'
import {Router} from 'angular2/router'

import {NotifyService} from "./notify.service";
import {Notify} from "./notify";

@Component({
    selector: 'notify',
    template: `
<div class="notify-container">
    <div
        *ngFor="#n of notify"
        [hidden]="!n.active"
        class="alert alert-dismissible alert-success">
        {{n?.content}}
    </div>
</div>
`,
    styles: [`
.notify-container {
    position: fixed;
    top: 0; right: 0;
    width: 400px;
    max-width: 100vw;
    z-index: 5100;
}
`]
})
export class NotifyComponent implements OnInit {
    constructor(private _router: Router) {}

    notify: Notify[];
    @Input() timeout: number = 3000;

    ngOnInit() {
        this._router.subscribe(() => this._getNotify());
        NotifyService.timeout = this.timeout;
        this._getNotify();
    }

    private _getNotify() {
        NotifyService.clearNotify();
        this.notify = NotifyService.getAllNotify();
    }
}
