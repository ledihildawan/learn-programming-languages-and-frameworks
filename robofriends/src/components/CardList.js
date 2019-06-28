import React from 'react';

import Card from './Card';

const CardList = ({ robots }) => {
  const cardArr = robots.map((user, idx) => {
    return (
      <Card key={idx} name={user.name} username={user.username} />
    );
  });

  return (
    <div>
      {cardArr}
    </div>
  );
};

export default CardList;