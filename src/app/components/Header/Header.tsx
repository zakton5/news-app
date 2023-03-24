'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const Header: FC = () => {
  const pathname = usePathname();
  const [country, route] = pathname.substring(1).split('/');

  const renderButton = (href: string, text: string, selected: boolean) => {
    let classes = 'py-2 px-4 rounded-xl drop-shadow-xl transition hover:scale-105 ';

    if (selected) {
      classes += 'bg-sky-300';
    } else {
      classes += 'bg-white';
    }

    return (
      <Link href={href}>
        <div className={classes}>{text}</div>
      </Link>
    );
  };

  return (
    <div className="flex flex-row items-center gap-2 p-4 w-full max-w-screen-xl ">
      <span className="text-4xl mr-4">News App</span>

      {renderButton(`${country}/news`, 'Top News', route === 'news')}
      {renderButton(`${country}/categories`, 'Categories', route === 'categories')}
      {renderButton(`${country}/search`, 'Search', route === 'search')}

      <div className="grow" />

      {renderButton(`gb/${route}`, 'GB', country === 'gb')}
      {renderButton(`us/${route}`, 'US', country === 'us')}
    </div>
  );
};

export default Header;
