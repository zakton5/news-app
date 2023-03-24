import { Story } from '../../../models/story';
import { NewsService } from '../../../services/api-service';
import NewsCard from '../../components/NewsCard/NewsCard';

export const metadata = {
  title: 'Top News',
  description: 'Check out the latest news stories!',
};

async function getData(country: string) {
  return await NewsService.getTopNews(country);
}

export default async function Page({ params }: { params: { country: string } }) {
  const stories = await getData(params.country);

  return (
    <div>
      <h1 className="text-2xl">Top News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {stories.map((story) => {
          return <NewsCard key={story.title} story={story} />;
        })}
      </div>
    </div>
  );
}
