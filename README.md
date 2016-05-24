#Angular2 Simple Notify

### Intall

```bash
npm install --save angular2-simple-notify
```

don't forget to add systemjs config (in this case, i'm using angular-cli structure)

```ts
// src/system-config.ts
//...
/** Map relative paths to URLs. */
const map: any = {
    'angular2-simple-notify': 'vendor/angular2-simple-notify'
};

/** User packages configuration. */
const packages: any = {
    'angular2-simple-notify': {defaultExtension: 'js'}
};
//...
```

and ...

```
// angular-cli-build.js
//...

module.exports = function(defaults) {
    return new Angular2App(defaults, {
        vendorNpmFiles: [
            // ...
            'angular2-simple-notify/**/*.js'
        ]
    });
};
```

### Getting Started

`boot.ts` or `main.ts`

```
// ...
import { ROUTER_PROVIDERS } from '@angular/router'

// ...
bootstrap(AppComponent, [ROUTER_PROVIDERS]);
``` 

`app.component.ts`

```ts
import {Component} from 'angular2/core';
//...
import {NotifyComponent, NotifyService} from "angular2-simple-notify/angular2-simple-notify";

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
        NotifyService.addNotify({name: "Notify", content:"This is a notification.", type: "danger"});
        NotifyService.addNotify({name: "Notify", content:"This is another <b>notification</b>.", timeout:1500});
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
    type?: string
}
```

##### NotifyComponent

```
<notify
        [position]="position"
        [timeout]="timeout"
        [type]="type">
</notify>
```

- **position**: *string* This is the position of the notification. Default value is `"top right"`.
- **timeout**: *number* This is the life time of the notification. Default value is `3000`.
- **type**: *string* This is the default type of the notification. Default value is `"success"`. Remember each notification has is own property `type`.

##### NotifyService

- **addNotify(notify: NotifyInterface): void**: Add instant notification.
- **addPendingNotify(notify: NotifyInterface): void**: Add notification but will be displayed after route changes.

##### Extends

Extends the NotifyComponent to use your own template.

Here is the minimal code before overriding the template.

```ts
import {Component} from 'angular2/core';
import {NotifyComponent} from "angular2-simple-notify/angular2-simple-notify";

@Component({
    selector: 'my-notify',
    template: `
<div [ngStyle]="_getStyle()">
    <div
        *ngFor="#n of notify"
        [hidden]="!n.active"
        [innerHtml]="n.content">
    </div>
</div>
`
})
export class TestComponent extends NotifyComponent {
    constructor(protected _router: Router) {
        super(this._router);
    }
}
```

Now you just need to call `<my-notify></my-notify>`

