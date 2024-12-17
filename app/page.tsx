import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">

        <div className="w-full md:w-2/3 flex flex-col gap-4 mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 w-full">Welcome to RMW</h1>
          <p className="mb-8 leading-relaxed">Share a ride if you are traveling the same direction.</p>
        </div>
        <div> SignInButton, Sign up button</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#" target="_blank" rel="noopener noreferrer">Developer</a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#" target="_blank" rel="noopener noreferrer">Backend docs</a>
      </footer>
    </div>
  );
}
