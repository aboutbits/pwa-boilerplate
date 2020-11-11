import React, { useState, useEffect, useRef } from 'react'
import { AlertDialog, AlertDialogLabel, AlertDialogDescription } from '@reach/alert-dialog'
import "@reach/dialog/styles.css";

import * as serviceWorker from './serviceWorkerRegistration'

const RegisterServiceWorker: React.FC = () => {
  const [showReload, setShowReload] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const acceptSWUpdateRef = useRef<HTMLButtonElement>(null)

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload(true)
  }

  useEffect(() => {
    serviceWorker.register({
      onUpdate: onSWUpdate,
    })
  }, [])

  return showReload ? (
    <AlertDialog leastDestructiveRef={acceptSWUpdateRef}>
      <AlertDialogLabel>New Version available!</AlertDialogLabel>
      <AlertDialogDescription>
        Hit "OK" to update the application cache.
      </AlertDialogDescription>
      <div className="alert-buttons">
        <button onClick={reloadPage}>Yes, update</button>{" "}
      </div>
    </AlertDialog>
  ) : null
}

export { RegisterServiceWorker }
