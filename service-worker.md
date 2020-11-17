# Service Worker

This project is based on Create React App v4, with service-workers enabled. For more details about Create React App and PWAs please go to the [documentation](https://create-react-app.dev/docs/making-a-progressive-web-app/).

## Table of Content

1. [Update Strategy](#update-strategy)
2. [Emergency](#emergency)

## Update Strategy

This example shows a very aggressive update strategy. Whenever we push a new version of our app we will try to upgrade as soon as possible and force update all open tabs. We don't show a popup, but refresh the page without asking the user. This could be dangerous for applications, that have a lots of long forms.

### Refresh service-worker every 60 minutes

Currently the app will look for updates every 60 Minutes. The default behaviour of browsers is to check every 24hours.

- https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours

The code responsible for the periodic 60 Minutes check lives [here](https://gitlab.com/aboutbits/pwa-boilerplate/-/blob/master/src/serviceWorkerRegistration.ts#L66-68).
If the service-worker has no changes, than nothing will happen, if there are changes than the service-worker update lifecylce kicks in.

### Service-Worker update lifecyle

1. **Install**: A new service-worker.js file was downloaded and is different to the current one. Now the browser will try to install it. The old one still remains the active service-worker that serves the currently open apps. The new service-worker goes into a waiting state.
2. **Waiting**: Unless all tabs are closed the new service-worker remains in this state, to prevent one tab being served by one service-worker and another tab by another service-worker. `self.skipWaiting()` prevents this behaviour and immeditately activates the new service worker. 
3. **Active**: Even though the new service-worker is active, unless a user refreshes the page, we will still see the old content, because the website never requested a new HTML. Therefore we have to reload the page and all tabs programmatically. The following piece of code makes sure that this happens:

```js
let refreshing = false;

// detect controller change and refresh the page
navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
        window.location.reload()
        refreshing = true
    }
})
```

In our example you can find it [here](https://gitlab.com/aboutbits/pwa-boilerplate/-/blob/master/src/serviceWorkerRegistration.ts#L55).

Great resources for more details:

- [Lifecycles](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#scope_and_control)
- [Update strategies](https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68)

## Emergency

What can we do if we delivered a broken service-worker.

### How can we unregister a broken service-worker?

More details on emergency strategies can be found here:
- https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776

```
cp service-worker-noop.js service-worker.js
rm service-worker.ts
```

We will create a new service-worker that unregisters itself. Once we fix the bug we can than reneable the old service-worker removing `service-worker.js` again.


### How to unregister a service-worker without delivering a new `service-worker.js` file?

The HTTP spec defines a Header called `Clear-Site-Data`, that supports removing cookie, storage, service-workers and more by simply adding this header to the response from the server. In case of a service-worker it makes sense to add this header on the `/service-worker.js` call, because in worst case every browser will request this endpoint after 24 hours.

Configure `vercel.json` to respond with `Clear-Site-Data` header on `service-worker.js` request. 
This will clear the browser data.
Every browser will by default request this endpoint every 24h.

```
"routes": [
        { "src": "/service-worker.js", "headers": { "Clear-Site-Data": "\"cache\", \"cookies\", \"storage\", \"executionContexts\"" }, "dest": "/service-worker.js"}
    ]
```
