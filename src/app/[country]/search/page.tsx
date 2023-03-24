import SearchPage from '../../components/SearchPage/SearchPage';

export const metadata = {
  title: 'Search',
  description: 'Search for top news!',
};

export default function Page({ params, searchParams }: { params: { country: string }; searchParams: { q: string } }) {
  return (
    <div>
      <h1 className="text-2xl mb-2">Search for top news</h1>

      <SearchPage country={params.country} initialQuery={searchParams.q} />
    </div>
  );
}
