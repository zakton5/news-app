'use client';

import { FC, useState } from 'react';

interface Props {
  initialValue?: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<Props> = ({ initialValue: value, onChange }) => {
  const [query, setQuery] = useState<string>(value ?? '');

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
