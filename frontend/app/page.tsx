export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Hello, I&apos;m James Odebiyi</h1>
        <p>I&apos;m a Software, Computer Engineer and Game developer.</p>
        <p>Welcome to my world.</p>
        <a
          href="/James-Odebiyi-Resume.pdf"
          className="mt-4 rounded-md border border-current px-5 py-2 font-medium hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          View resume (PDF)
        </a>
      </div>
    </div>
  );
}
