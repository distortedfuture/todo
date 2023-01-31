// import React, {useEffect} from "react";
// import { Typography, Box } from "@mui/material";
// import useSpotifyWebPlaybackSdk from 'react-spotify-web-playback';

// const spotifyToken = "BQDREHL04Pz3vsDxD1wgdJE6QY-fXTwU7dkKoyiKlblkvZiwvP1JVf4R5NLIZ9SEil1VL1mQ84T6ifuGW2FRWdYyuQMOOoQmxFbML7pO3C2AUl5evL0ihSI1T6iwutA-cqN6V_22bh1epZPlmZ-_wQapDZz4F5gvfVlK-hRFFy2cMAvnHfekpKkwDSaalW_gotQ";



// export default function Player() {
//     const {
//         Script: WebPlaybackSdkScript,
//         deviceId,
//         connect: connectWebPlaybackSdk,
//         player, // https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player
//         isReady,
//     } = useSpotifyWebPlaybackSdk({
//         name: "React",
//         getOAuthToken: () => Promise.resolve(spotifyToken), // Wherever you get your access token from
//         onPlayerStateChanged: (playerState) => {
//             console.log('player state changed:', playerState);
//         }
//     });

//     useEffect(
//     () => {
//       if (isReady) {
//         connect();
//       }
//     },
//     [isReady],
//     );
    
// }

