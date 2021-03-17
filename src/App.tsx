import './App.css'
import { getToken, onMessageListener } from './firebase'

function App() {
  getToken()
  onMessageListener()
    .then((payload) => {
      //setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload)
    })
    .catch((err) => console.log('failed: ', err))

  return (
    <div className="App">
      <header className="App-header">
        <p>Boilerplate - PWA</p>
        <p>Version 23</p>
      </header>
    </div>
  )
}

export default App
