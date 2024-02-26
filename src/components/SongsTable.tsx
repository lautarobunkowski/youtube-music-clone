// import React from 'react'
import type { Playlist, Item } from "@types/Playlist";
import type { MostPopularSongs } from "@types/mostPopularSongs";
import type { Album } from "@types/album";
import { Link } from "react-router-dom";
import useStore from "@store/store";

export type PropsSongsTable = {
  tracks: MostPopularSongs;
};

const formatTime = (time: number) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor(time / 1000 / 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const SongsTable = ({ tracks }: PropsSongsTable) => {
  const { setIsPlaying } = useStore((state) => state);

  const handlerPlayMusic = async () => {
    // const response = await axios.put(
    //   `https://api.spotify.com/v1/me/player/play/device_id=0d1841b0976bae2a3a310dd74c0f3df354899bc8
    //   `,
    //   {
    //     context_uri: `spotify:album:${playlistId}`,
    //     offset: {
    //       position: position,
    //     },
    //     position_ms: 0,
    //   }
    // );
    setIsPlaying();
  };

  return (
    <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/20">
      <tbody>
        {tracks.tracks !== undefined ? (
          tracks.tracks.slice(0, 5).map((track, index) => (
            <tr
              key={`track-${index}`}
              className="border-b border-zinc-800 h-12 font-semibold"
            >
              <td className="w-[550px]">
                <div
                  className="flex ml-2 gap-x-6 items-center cursor-pointer"
                  onClick={() => handlerPlayMusic()}
                >
                  <img
                    src={track.album.images[2]?.url}
                    alt={track.name}
                    className="w-8 h-8"
                  />
                  <h3>{track.name}</h3>
                </div>
              </td>
              <td>
                <Link
                  to={`/channel/${track.artists[0].id}`}
                  className="hover:underline text-zinc-500"
                >
                  {track.artists[0].name}
                </Link>
              </td>
              <td>
                <Link
                  to={`/album?list=${track.album.id}`}
                  className="hover:underline text-zinc-500"
                >
                  {track.album.name}
                </Link>
              </td>
              {/* <td className="text-end text-zinc-500">
                {formatTime(track.duration_ms)}
              </td> */}
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-xl text-zinc-500 font-extralight">
              No hay elementos en la lista de reproducción.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export type PropsPlaylistSongsTable = {
  playlist: Playlist;
};

export const PlaylistSongsTable = ({ playlist }: PropsPlaylistSongsTable) => {
  const { setIsPlaying } = useStore((state) => state);

  const handlerPlayMusic = async () => {
    // const response = await axios.put(
    //   `https://api.spotify.com/v1/me/player/play/device_id=0d1841b0976bae2a3a310dd74c0f3df354899bc8
    //   `,
    //   {
    //     context_uri: `spotify:playlist:${playlistId}`,
    //     offset: {
    //       position: position,
    //     },
    //     position_ms: 0,
    //   }
    // );
    setIsPlaying();
  };

  return (
    <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/20">
      <tbody>
        {playlist.tracks.items.length > 0 ? (
          playlist.tracks.items.map((track, index) => (
            <tr
              key={`track-${index}`}
              className="border-b border-zinc-800 h-12 font-semibold"
            >
              <td className="w-[550px]">
                <div
                  className="flex ml-2 gap-x-6 items-center cursor-pointer"
                  onClick={() => handlerPlayMusic()}
                >
                  <img
                    src={track.track.album.images[2]?.url}
                    alt={track.track.name}
                    className="w-8 h-8"
                  />
                  <h3>{track.track.name}</h3>
                </div>
              </td>
              <td>
                <Link
                  to={`/channel/${track.track.artists[0].id}`}
                  className="hover:underline text-zinc-500"
                >
                  {track.track.artists[0].name}
                </Link>
              </td>
              <td className="text-end text-zinc-500">
                {formatTime(track.track.duration_ms)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-xl text-zinc-500 font-extralight">
              No hay elementos en la lista de reproducción.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export type PropsAlbumSongsTable = {
  album: Album;
};

export const AlbumSongsTable = ({ album }: PropsAlbumSongsTable) => {
  const { setIsPlaying } = useStore((state) => state);

  const handlerPlayMusic = async () => {
    // const response = await axios.put(
    //   `https://api.spotify.com/v1/me/player/play/device_id=0d1841b0976bae2a3a310dd74c0f3df354899bc8
    //   `,
    //   {
    //     context_uri: `spotify:album:${playlistId}`,
    //     offset: {
    //       position: position,
    //     },
    //     position_ms: 0,
    //   }
    // );
    setIsPlaying();
  };

  return (
    <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/20">
      <tbody>
        {album.tracks.items.length > 0 ? (
          album.tracks.items.map((track, index) => (
            <tr
              key={`track-${index}`}
              className="border-b border-zinc-800 h-12 font-semibold"
            >
              <td className="w-[550px]">
                <div
                  className="flex ml-2 gap-x-6 items-center cursor-pointer"
                  onClick={() => handlerPlayMusic()}
                >
                  <img
                    src={album.images[2]?.url}
                    alt={track.name}
                    className="w-8 h-8"
                  />
                  <h3>{track.name}</h3>
                </div>
              </td>
              <td className="text-end text-zinc-500">
                {formatTime(track.duration_ms)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-xl text-zinc-500 font-extralight">
              No hay elementos en la lista de reproducción.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};