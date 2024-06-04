import './App.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'

function App() {

  return (
    <TonConnectUIProvider manifestUrl="https://storage.yandexcloud.net/pure-colors/cornzange/ton-manifest.json">
      <div className="App">
        <Header></Header>
        <Content ></Content>
        <Footer ></Footer>
      </div>
    </TonConnectUIProvider>
  )
}

export default App
