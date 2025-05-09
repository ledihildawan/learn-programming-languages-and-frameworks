import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Video from './Video';
import Menu from './Menu';

const VIDEOS = {
  fast: 'https://content.codecademy.com/courses/React/react_video-fast.mp4',
  slow: 'https://content.codecademy.com/courses/React/react_video-slow.mp4',
  cute: 'https://content.codecademy.com/courses/React/react_video-cute.mp4',
  eek: 'https://content.codecademy.com/courses/React/react_video-eek.mp4'
};

function App() {
	const [src, setSrc] = useState(VIDEOS.fast);


  const selectVideoHandler = (newVideo) => {
    setSrc(VIDEOS[newVideo]);
  };

	return (
      <div>
        <h1>Video Player</h1>
        <Menu onSelectVideoHandler={selectVideoHandler} />
        <Video src={src} />
      </div>
    );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);