# Service Worker

This project is based on Create React App v4, with service-workers enabled. For more details about Create React App and PWAs please go the documentation.

- https://create-react-app.dev/docs/making-a-progressive-web-app/

## Table of Content

1. [Update Strategy](#update-strategy)
2. [Emergency](#emergency)

## Update Strategy

This example shows a very aggressive update strategy. Whenever we push a new version of our app we will try to upgrade as soon as possible and force update all open tabs.

### Refresh service-worker every 60 minutes

Currently the app will look for updates every 60 Minutes. The default behaviour of browsers is to check every 24hours.

- https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours

The code responsible for the periodic 60 Minutes check lives here:

https://gitlab.com/aboutbits/pwa-boilerplate/-/blob/master/src/serviceWorkerRegistration.ts#L55

If the service-worker has no changes, than nothing will happen, if there are changes than the service-worker update lifecylce kicks in.

### Service-Worker update lifecyle



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
