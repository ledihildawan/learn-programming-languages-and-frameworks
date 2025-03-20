"use client";

import Banner from "@/components/Banner";
import Card from "@/components/Card";

function Home() {
  return (
    <main className="sm:mt-12 sm:px-6 md:mt-16 lg:px-8 lg:mt-20 xl:mt-28 mx-auto max-w-6xl">
      <Banner buttonText="View stores nearby" handleOnClick={() => {}} />

      <section className="mt-20">
        <h2 className="text-4xl pb-8 mt-8 text-gray-200 font-bold">
          Jakarta Barat
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            key="TOMORO COFFEE LAPANGAN BOLA"
            name="TOMORO COFFEE LAPANGAN BOLA"
            href=""
            imgUrl="https://lh3.googleusercontent.com/p/AF1QipPMWOw6I-EcSQ1YxIi6ZDbGp1UUXNXfXeBa9vY=s680-w680-h510"
          />
          <Card
            key="Helo Coffee"
            name="Helo Coffee"
            href=""
            imgUrl="https://lh5.googleusercontent.com/p/AF1QipOMGtxXMSsBNdI4nnsGbLnZWc5QLjUEUNzU8FIc=s1024"
          />
          <Card
            key="Three Folks Ice Cream & Coffee"
            name="Three Folks Ice Cream & Coffee"
            href=""
            imgUrl="https://lh5.googleusercontent.com/p/AF1QipPD-XaQh6qcjIcytUX8z63pMuiB6c7D8teBAIly=s1024"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
