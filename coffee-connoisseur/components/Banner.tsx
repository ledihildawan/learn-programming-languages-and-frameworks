import Image from "next/image";

function Banner(props: { buttonText: string; handleOnClick: () => void }) {
  return (
    <section className="mb-24 lg:flex lg:gap-16 sm:items-center">
      <div>
        <h1 className="font-extrabold text-5xl leading-none -tracking-wide md:text-6xl lg:text-7xl">
          <span className="text-white">Coffee</span>
          <span className="block text-purple-900 md:pl-2 xl:inline">
            Connoisseur
          </span>
        </h1>
        <p className="mt-5 text-2xl leading-8 text-gray-200">
          Discover your local coffee stores!
        </p>
        <div className="mt-5 sm:mt-8">
          <button
            className="text-white py-4 px-10 bg-purple-900 font-semibold rounded-xl"
            onClick={props.handleOnClick}
          >
            {props.buttonText}
          </button>
        </div>
      </div>

      <Image
        alt="Illustrated hands holding a steaming cup of coffee with the text 'Everything is better with Coffee' on a pastel purple background."
        src="/delicious-coffee-mug-illustrated.jpg"
        className="hidden lg:block rounded-xl"
        width={320}
        height={320}
      />
    </section>
  );
}

export default Banner;
