'use client';

import { FC, useState } from 'react';

interface Props {
  onChange: (value: string) => void;
}

const SearchBar: FC<Props> = ({ onChange }) => {
  const [query, setQuery] = useState<string>('');

  return (
    <input
      className="outline-0 rounded-xl py-2 px-4 drop-shadow-xl w-full"
      value={query}
      placeholder="Search..."
      onChange={(e) => {
        setQuery(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

export default SearchBar;
