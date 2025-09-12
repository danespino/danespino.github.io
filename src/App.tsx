import Icon from './components/ui/Icon'
import './App.css'
import Alert from './components/ui/Alert'

function App() {

  return (
    <>
      <Icon name='github' library='bootstrap' size={24} />
      <Alert variant='error' message='Error' />
    </>
  )
}

export default App
