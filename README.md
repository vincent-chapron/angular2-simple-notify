#Angular2 Simple Notify

### Intall

```bash
npm install --save angular2-simple-notify
```

don't forget to add systemjs config

```js
//...
    map: {
        //...
        'angular2-simple-notify': 'node_modules/angular2-simple-notify'
    }
//...
```

### Getting Started

```ts
import {Component} from 'angular2/core';
//...
import {NotifyComponent} from "angular2-simple-notify/NotifyComponent";
import {NotifyService} from "./shared/notify/notifyService";

@Component({
    selector: 'app',
    //...
    template: `
<notify></notify>
<button (click)="onClick()">Notify</button>
    `,
    directives: [NotifyComponent]
})
export class AppComponent {
    onClick() {
        NotifyService.addNotify({name: "Notify", content:"This is a notification."})
    }
}
```

Use `<notify></notify>` tag only once in your application.

You can add an instant notification with `NotifyService.addNotify()`


### Guide

##### NotifyInterface

```ts
{
    name: string
    content: string
    active?: boolean
    timeout?: number
}
```

##### NotifyComponent

```
<notify
        [position]="position"
        [timeout]="timeout">
</notify>
```

- **position**: *string* This is the position of the notification. Default value is `"top right"`.
- **timeout**: *number* This is the life time of notification. Default value is `3000`.

##### NotifyService

- **addNotify(notify: NotifyInterface): void**: Add instant notification.
- **addPendingNotify(notify: NotifyInterface): void**: Add notification but will be displayed after route changes.
