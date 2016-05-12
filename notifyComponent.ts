import {Component, OnInit, Input, Output} from 'angular2/core'
import {Router} from 'angular2/router'

import {NotifyService} from "./notifyService";
import {NotifyInterface} from "./notifyInterface";

@Component({
    selector: 'notify',
    template: `
<div [class]="'notify-container ' + _getPosition()">
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
    width: 400px;
    max-width: 100vw;
    z-index: 5100;
}

.top-right, .right-top {top: 0; right: 0;}
.top-left, .left-top {top: 0; left: 0;}
.bottom-right, .right-bottom {bottom: 0; right: 0;}
.bottom-left, .left-bottom {bottom: 0; left: 0;}
`]
})
export class NotifyComponent implements OnInit {
    constructor(private _router: Router) {}

    notify: NotifyInterface[];
    @Input() timeout: number = 3000;
    @Input() position: string = "top right";

    ngOnInit() {
        this._router.subscribe(() => this._getNotify());
        NotifyService.timeout = this.timeout;
        this._getNotify();
    }

    private _getPosition() {
        return this.position.replace(' ', '-');
    }

    private _getNotify() {
        NotifyService.clearNotify();
        this.notify = NotifyService.getAllNotify();
    }
}
