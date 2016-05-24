import {Injectable} from '@angular/core'

import {NotifyInterface} from "./notifyInterface";

@Injectable()
export class NotifyService {
    private static _notify: NotifyInterface[] = [];
    private static _pendingNotify: NotifyInterface[] = [];

    public static timeout: number = 3000;

    public static addNotify(notify: NotifyInterface) {
        let timeout = (notify.timeout) ? notify.timeout : this.timeout;
        notify.active = true;
        NotifyService._notify.push(notify);
        setTimeout(() => {
            notify.active = false;
        }, timeout);
    }

    public static addPendingNotify(notify: NotifyInterface) {
        notify.active = true;
        NotifyService._pendingNotify.push(notify);
    }

    public static getAllNotify(): NotifyInterface[] {
        NotifyService._pendingNotify.forEach(n => {
            NotifyService.addNotify(n);
        });
        NotifyService._pendingNotify = [];

        return NotifyService._notify
    }

    public static clearNotify() {
        let notifyIndex:any[] = [];

        NotifyService._notify.forEach((n, i) => {
            if (!n.active)
                notifyIndex.push(i);
        });

        for (let i = notifyIndex.length - 1; i >= 0; i--)
            NotifyService._notify.splice(i, 1);
    }
}
