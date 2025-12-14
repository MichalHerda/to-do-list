import './App.css'
import AuthForm from './components/AuthForm'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img
          src="/toDoListLogo.png"
          alt="Logo aplikacji"
          className="app-logo"
        />
      </header>

     <main className="app-content">
        <AuthForm/>
      </main>
    </div>
  )
}

export default App
