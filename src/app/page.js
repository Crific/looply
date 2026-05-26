
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black ">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-5xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Looply
          </h1>
          <p className="max-w-md mx-auto leading-8 text-zinc-600 dark:text-zinc-400">
            Scan. Earn. Loop{" "}
          </p>
          <img src="/info.png" alt="Info Graphic" width="800" />
          <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition">
            Get Started
          </button>
        </div>
        <div className="flex">
          <p>Already have an account? </p>
          <button className="px-3 text-blue-500">
            Log In
          </button>
        </div>

      </main>
    </div>
  );
}
