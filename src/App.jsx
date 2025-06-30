
function App() {

  return (
    <div className="min-h-screen body-font text-gray-600 dark:text-white">
      <div class="flex flex-col items-center justify-center h-screen">
        <div class="text-center lg:w-2/3 w-full">
          <h1 class="title-font sm:text-8xl text-4xl mb-4 font-medium text-gray-900 
            dark:text-white">Ride my way</h1>
          <p class="mb-8 leading-relaxed sm:text-3xl text-lg">Share a ride if you are going the same direction.</p>
          <div class="flex justify-center">
            <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none
             hover:bg-indigo-600 rounded text-lg">Login</button>
            <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none
             hover:bg-gray-200 rounded text-lg">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
