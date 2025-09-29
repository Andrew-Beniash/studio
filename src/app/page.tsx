"use client";

import { Header } from "@/components/header";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-16 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-center text-black dark:text-white">Welcome</h1>
          <p className="text-muted-foreground text-center mt-2">
            The avatar generation form has been removed.
          </p>
        </div>
      </main>
    </div>
  );
}
