import Image from 'next/image';
import {useRouter} from 'next/router';

function MovieThumbnail({movie}) {
    const router = useRouter();
    const BASE_URL = "https://image.tmdb.org/t/p/original";
    return (
      <div
        onClick={() => router.push(`/movie/${movie.id}/`)}
        className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10 hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-out"
      >
        <Image
          src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          width={330}
          height={210}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    );
}

export default MovieThumbnail
