import AuthForm from './components/AuthForm'

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* HEADER - 20% wysokości */}
      <header className="flex justify-center items-center h-[20vh] w-full border-b border-gray-700">
        <img
          src="/toDoListLogo.png"
          alt="Logo aplikacji"
          className="max-h-full object-contain"
        />
      </header>

      {/* MAIN CONTENT - 80% wysokości, formularz wycentrowany */}
      <main className="flex justify-center items-center h-[80vh] w-full px-4">
        <div className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg">
          <AuthForm />
        </div>
      </main>

      {/* TEST */}
      <div className="text-red-500 text-xl p-4 text-center">Tailwind is OK</div>
    </div>
  )
}

export default App
