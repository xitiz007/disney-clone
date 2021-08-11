import Head from 'next/head';
import Header from '../components/Header';
import { getSession, useSession } from 'next-auth/client';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import Brands from '../components/Brands';
import MoviesCollection from '../components/MoviesCollection';
import ShowsCollection from '../components/ShowsCollection';

export default function Home({ popularMovies, popularShows, topRatedMovies, topRatedShows }) {
  const [session] = useSession();
  return (
    <div className="">
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Banner />
      ) : (
        <main className="relative min-h-screen after:bg-home after:absolute after:inset-0 after:bg-cover after:z-[-1] after:bg-fixed after:bg-no-repeat after:bg-center">
          <Slider />
          <Brands />
          <MoviesCollection movies={popularMovies} title="Popular Movies"/>
          <ShowsCollection shows={popularShows} title="Popular Shows"/>
          <MoviesCollection movies={topRatedMovies} title="Top Rated Movies"/>
          <ShowsCollection shows={topRatedShows} title="Top Rated Shows"/>
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context)
{
  const session = await getSession(context);
  const API_KEY = process.env.API_KEY;
  const [popularMoviesRes, popularShowsRes, topRatedMoviesRes, topRatedShowsRes] =
  await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
  ]);

  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatedShowsRes.json(),
  ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      topRatedMovies: topRatedMovies.results,
      topRatedShows: topRatedShows.results,
    },
  };
}
