import Image from "next/image";
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import {signIn, useSession, signOut} from 'next-auth/client';
import { useRouter } from 'next/router';

function Header() {
  const [session] = useSession();
  const router = useRouter();

  return (
      <header className="sticky top-0 bg-[#040714] z-50 flex items-center px-10 md:px-12 h-[72px]">
        <Image
          src="/images/logo.svg"
          width={80}
          height={80}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />
        {
          session && 
          (
            <div className="hidden ml-10 md:flex items-center space-x-6">
              <a
              onClick={() => router.push('/')}
              className="header-link group">
                <HomeIcon className="h-4" />
                <span className="span">Home</span>
              </a>
              <a className="header-link group">
                <SearchIcon className="h-4" />
                <span className="span">Search</span>
              </a>
              <a className="header-link group">
                <PlusIcon className="h-4" />
                <span className="span">Watchlist</span>
              </a>
              <a className="header-link group">
                <StarIcon className="h-4" />
                <span className="span">Originals</span>
              </a>
              <a className="header-link group">
                <img src="/images/movie-icon.svg" alt="" className="h-5" />
                <span className="span">Movies</span>
              </a>
              <a className="header-link group">
                <img src="/images/series-icon.svg" alt="" className="h-5" />
                <span className="span">Series</span>
              </a>
            </div>
          )
        }
        {
          session ? 
          (
            <img
            onClick={signOut} 
            src={session?.user?.image} 
            alt={session?.user?.name} 
            className="w-12 h-12 rounded-full ml-auto cursor-pointer hover:opacity-90 object-cover"/>
          ):
          (
            <button
            onClick={signIn}
            className="ml-auto uppercase tracking-wider border px-4 py-1.5 rounded font-medium hover:bg-white hover:text-black transition duration-500 ease-out">
                Login
            </button>            
          )
        }

      </header>
    );
}

export default Header
