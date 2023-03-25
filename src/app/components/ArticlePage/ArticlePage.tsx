'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Article } from '../../../models/article';

const ArticlePage: FC<{ article: Article }> = ({ article }) => {
  const router = useRouter();

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-4xl mb-4">{article.title}</h1>
      <p className="text-xl mb-4">{article.description}</p>

      {article.urlToImage && (
        <div className="relative h-96 mb-4">
          <Image alt="headline image" src={article.urlToImage!} className="object-cover" fill />
        </div>
      )}

      <p className="mb-4">{article.content}</p>

      <div className="text-sm cursor-pointer" onClick={() => router.back()}>
        &lsaquo; Back to list
      </div>
    </div>
  );
};

export default ArticlePage;
