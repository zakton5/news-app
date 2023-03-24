'use client';

import { FC } from 'react';
import { Story } from '../../../models/story';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  story: Story;
}

const NewsCard: FC<Props> = ({ story }) => {
  const pathname = usePathname();
  const [country, route] = pathname.substring(1).split('/');

  return (
    <Link href={`${country}/news/${story.title}`}>
      <div className="relative drop-shadow-xl rounded-lg bg-white overflow-hidden cursor-pointer transition hover:scale-105">
        <div className="relative h-60 border-b-2 border-sky-300">
          {story.urlToImage && <Image alt="headline image" src={story.urlToImage!} className="object-cover" fill />}
        </div>

        <div className="h-44 p-4">
          <h2 className="text-3xl max-h-20 truncate text-ellipsis overflow-hidden mb-2">{story.title}</h2>
          <p className="max-h-40 line-clamp-4">{story.description ?? story.content ?? '-'}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
