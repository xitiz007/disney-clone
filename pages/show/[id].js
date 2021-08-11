import Head from "next/head";
import Header from "../../components/Header";
import { getSession, useSession } from "next-auth/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";

function Show({ show }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [session] = useSession();
  const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const index = show.videos.results.findIndex(
    (result) => result.type === "Trailer"
  );

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="relative">
      <Head>
        <title>{show.title || show.original_name}</title>
      </Head>
      <Header />
      {session && (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={`${BASE_URL}${show.backdrop_path || show.poster_path}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {show.title || show.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center px-6 py-2.5 rounded hover:bg-[#c6c6c6] transition duration-300 ease-out">
                <img
                  src="/images/play-icon-black.svg"
                  className="h-6 md:h-8 text-black"
                />
                <span className="uppercase tracking-wider font-medium">
                  Play
                </span>
              </button>
              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6] transition duration-300 ease-out"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div className="rounded-full border-white border-2 w-11 h-11 flex items-center justify-center cursor-pointer bg-black/60">
                <PlusIcon className="h-6" />
              </div>
              <div className="rounded-full border-white border-2 w-11 h-11 flex items-center justify-center cursor-pointer bg-black/60">
                <img src="/images/group-icon.svg" alt="icon" />
              </div>
            </div>
            <p className="text-xs md:text-sm">
              {show.release_date || show.first_air_date} •{" "}
              {Math.floor(show.runtime / 60)}h {show.runtime % 60}m •{" "}
              {show.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{show.overview}</h4>
          </div>

          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
          )}
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ease-out ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                onClick={() => setShowPlayer(false)}
                className="cursor-pointer w-8 h-8 flex justify-center items-center opacity-50 hover:opacity-75 hover:bg-[#0F0F0F00] rounded-lg transition duration-200 ease-out"
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              {showPlayer && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${show?.videos?.results[index]?.key}`}
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                  controls={true}
                  playing={showPlayer}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Show;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  const API_KEY = process.env.API_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  );
  const show = await response.json();
  return {
    props: {
      show,
      session,
    },
  };
}
