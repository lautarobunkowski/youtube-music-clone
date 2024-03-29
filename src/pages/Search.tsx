import { useState, useEffect } from "React";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import type { SearchData } from "@types/search";
import Explicit from "@icons/Explicit";

const Search = () => {
  const [searchInfo, setSearchInfo] = useState<SearchData>();
  const location = useLocation().search;

  const urlParams = new URLSearchParams(location);
  const qParam = urlParams.get("q");
  console.log(qParam?.split(" ").join("%20"));

  useEffect(() => {
    const type = [
      "artist",
      "track",
      "album",
      "playlist",
      "episode",
      "audiobook",
    ];
    const fetchData = async () => {
      const { data } = await axios(
        `https://api.spotify.com/v1/search?q=${qParam
          ?.split(" ")
          .join("%20")}&type=${type.join()}&limit=3`
      );
      setSearchInfo(data);
      console.log(data);
    };

    fetchData();
    // return () => {
    //   setSearchInfo({})
    // }
  }, [qParam]);

  return (
    <div className="pt-4 my-0 mx-auto max-w-[860px]">
      <div className="albumes">
        <h4 className="font-bold text-2xl my-4">Álbumes</h4>
        <div className="">
          <ul>
            {searchInfo?.albums.items.map((album, index) => {
              return (
                <li
                  key={`searched-album-${index}`}
                  className={`${
                    searchInfo?.albums.items.length - 1 === index
                      ? "border-b-none"
                      : "border-b border-zinc-700"
                  }`}
                >
                  <Link
                    to={`/album?list=${album.id}`}
                    className=" flex items-center py-3 px-2 gap-4 "
                  >
                    <picture className="w-14 h-14 aspect-square overflow-hidden">
                      <img
                        src={album.images[2].url}
                        alt={album.name}
                        className="w-14 h-14"
                      />
                    </picture>
                    <div className="">
                      <p className="font-medium text-base mb-1">{album.name}</p>
                      <div className="font-medium text-base text-zinc-400">
                        <span className="inline-block">
                          {album.explicit && <Explicit />}
                        </span>
                        <span>{album.type}</span>
                        <span> • </span>
                        <span>{album.artists[0].name}</span>
                        <span> • </span>
                        <span>{album.release_date.slice(0, 4)}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="artistas">
        <h4 className="font-bold text-2xl my-4">Artistas</h4>
        <div className="">
          <ul>
            {searchInfo?.artists.items.map((artist, index) => {
              return (
                <li
                  key={`searched-album-${index}`}
                  className={`${
                    searchInfo?.artists.items.length - 1 === index
                      ? "border-b-none"
                      : "border-b border-zinc-700"
                  }  `}
                >
                  <Link to={`/channel/${artist.id}`} className="flex items-center py-3 px-2 gap-4">
                  <picture className="w-14 h-14 aspect-square overflow-hidden">
                    <img
                      src={artist.images[2].url}
                      alt={artist.name}
                      className="w-14 h-14"
                    />
                  </picture>
                  <div className="">
                    <p className="font-medium text-base mb-1">{artist.name}</p>
                    <div className="font-medium text-base text-zinc-400">
                      <span>{artist.type}</span>
                      <span> • </span>
                      <span>suscriptores</span>
                    </div>
                  </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="canciones">
        <h4 className="font-bold text-2xl my-4">Canciones</h4>
        <div className="">
          <ul>
            {searchInfo?.tracks.items.map((track, index) => {
              return (
                <li
                  key={`searched-album-${index}`}
                  className={`${
                    searchInfo?.tracks.items.length - 1 === index
                      ? "border-b-none"
                      : "border-b border-zinc-700"
                  } flex items-center py-3 px-2 gap-4 `}
                >
                  <picture className="w-14 h-14 aspect-square overflow-hidden">
                    <img
                      src={track.album.images[2].url}
                      alt={track.name}
                      className="w-14 h-14"
                    />
                  </picture>
                  <div className="">
                    <Link to={`/`}>
                    <p className="font-medium text-base mb-1">{track.name}</p>
                    </Link>
                    <div className="font-medium text-base text-zinc-400">
                      <Link to={`/channel/${track.artists[0].id}`} className="hover:underline">
                      <span>{track.artists[0].name}</span>
                      </Link>
                      <span> • </span>
                      <Link to={`/album?list=${track.album.id}`} className="hover:underline">
                      <span>{track.album.name}</span>
                      </Link>
                      <span> • </span>
                      <span>3:00</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="playlist">
        <h4 className="font-bold text-2xl my-4">Playlist</h4>
        <div className="">
          <ul>
            {searchInfo?.playlists.items.map((playlist, index) => {
              return (
                <li
                  key={`searched-album-${index}`}
                  className={`${
                    searchInfo?.playlists.items.length - 1 === index
                      ? "border-b-none"
                      : "border-b border-zinc-700"
                  }  `}
                >
                  <Link to={`/playlist?list=${playlist.id}`} className="flex items-center py-3 px-2 gap-4">
                  <picture className="w-14 h-14 aspect-square overflow-hidden">
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      className="w-14 h-14"
                    />
                  </picture>
                  <div className="">
                    <p className="font-medium text-base mb-1">{playlist.name}</p>
                    <div className="font-medium text-base text-zinc-400">
                      <span>{playlist.type}</span>
                      <span> • </span>
                      <span>{playlist.owner?.display_name}</span>
                    </div>
                  </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
