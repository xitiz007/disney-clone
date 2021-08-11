import Image from 'next/image';
import Head from 'next/head';

function Banner() {
    return (
      <section>
        <Head>
          <title>Log in | Disney+</title>
        </Head>
        <div className="relative min-h-[calc(100vh-72px)]">
          <Image
            src="/images/hero-background.jpg"
            layout="fill"
            objectFit="cover"
          />
          <div className="flex justify-center items-center">
            <div className="space-y-4 absolute flex flex-col justify-center items-center top-1/4 w-full max-w-screen-sm mx-auto p-8 -mt-16">
              <Image
                src="/images/cta-logo-one.svg"
                width={600}
                height={150}
                objectFit="contain"
              />
              <button className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold py-4 px-6 w-full rounded hover:bg-[#0485ee] transition duration-300 ease-out">
                Get all there
              </button>
              <p className="text-xs text-center">
                Get Premier Access to Raya and the Last Dragon for an additional
                fee with a Disney+ subscription. As of 03/26/21, the price of
                Disney+ and The Disney Bundle will increase by $
              </p>
              <Image
                src="/images/cta-logo-two.png"
                width="600"
                height="70"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full py-2">
            <h4 className="text-center font-semibold tracking-wide text-white text-xs sm:text-sm opacity-90">
              Designed by{" "}
              <a
              className="hover:text-green-400 transition duration-200 ease-out"
               target="_blank" 
               href="https://www.baniyakshitiz.com.np/">
                Kshitiz Baniya
              </a>
            </h4>
          </div>
        </div>
      </section>
    );
}

export default Banner
