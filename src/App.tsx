import './App.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'

function App() {

  return (
    <TonConnectUIProvider manifestUrl="https://firebasestorage.googleapis.com/v0/b/check-e1763.appspot.com/o/ton-manifest.json?alt=media&token=2f2e7cfd-99f6-4ca6-9787-5feb5fc47e0a">
      <div className="App">
        <Header></Header>
        <Content ></Content>
        <Footer ></Footer>
      </div>
    </TonConnectUIProvider>
  )
}

export default App
