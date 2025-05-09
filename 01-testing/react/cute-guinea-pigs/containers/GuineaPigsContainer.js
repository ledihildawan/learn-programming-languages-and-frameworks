import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import GuineaPigsForm from "../components/GuineaPigsForm";
import GuineaPigsSlideShow from "../components/GuineaPigsSlideShow";

const GUINEAPATHS = [
  "https://content.codecademy.com/courses/React/react_photo-guineapig-1.jpg",
  "https://content.codecademy.com/courses/React/react_photo-guineapig-2.jpg",
  "https://content.codecademy.com/courses/React/react_photo-guineapig-3.jpg",
  "https://content.codecademy.com/courses/React/react_photo-guineapig-4.jpg",
];

function GuineaPigsContainer() {
  const [currentGP, setCurrentGP] = useState(0);
	const [favoriteGP, setFavoriteGP] = useState(0);
	const src = GUINEAPATHS[currentGP];

  const favoriteChangeHandler = (event) => {
    setFavoriteGP(parseInt(event.target.value));
  }

  const resetFavoriteHandler = () => {
    setFavoriteGP(0);
  }

  useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentGP(prevGP => {
				const nextGP = prevGP + 1;
				return nextGP % GUINEAPATHS.length;
			});
		}, 5000)
		return () => clearInterval(intervalId);
	}, []);


	return (
    <>
      <GuineaPigsSlideShow
        src={src}
        isFavorite={true}
      />
		  <div data-testid="guineaPigsForm" id="guineaPigsForm">
        <GuineaPigsForm
          favoriteGP={favoriteGP}
          onResetFavorite={resetFavoriteHandler}
          onSelectFavorite={favoriteChangeHandler}
        />
		  </div>
  </>
  );
}

export default GuineaPigsContainer;
