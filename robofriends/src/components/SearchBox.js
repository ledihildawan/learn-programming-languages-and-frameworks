import React from 'react';

const SearchBox = ({ searchChange }) => {
  return (
    <div>
      <input type="search" placeholder="Ledi Hildawan" onChange={searchChange} />
    </div>
  );
};

export default SearchBox;