import {Injectable} from 'angular2/core'

import {Notify} from "./notify";

@Injectable()
export class NotifyService {
    private static _notify: Notify[] = [];
    private static _pendingNotify: Notify[] = [];

    public static timeout: number = 3000;

    public static addNotify(notify: Notify) {
        notify.active = true;
        NotifyService._notify.push(notify);
        setTimeout(() => {
            notify.active = false;
        }, notify.timeout ? notify.timeout : this.timeout);
    }

    public static addPendingNotify(notify: Notify) {
        notify.active = true;
        NotifyService._pendingNotify.push(notify);
    }

    public static getAllNotify(): Notify[] {
        NotifyService._pendingNotify.forEach(n => {
            NotifyService.addNotify(n);
        });
        NotifyService._pendingNotify = [];

        return NotifyService._notify
    }

    public static removeAllNotify() {
        NotifyService._notify = [];
    }

    public static disableAllNotify() {
        NotifyService._notify.forEach(n => {
            n.active = false;
        })
    }

    public static clearNotify() {
        let notifyIndex = [];

        NotifyService._notify.forEach((n, i) => {
            if (!n.active)
                notifyIndex.push(i);
        });

        for (let i = notifyIndex.length - 1; i >= 0; i--)
            NotifyService._notify.splice(i, 1);
    }
}
