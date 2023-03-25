import CategoriesPage from '../../components/CategoriesPage/CategoriesPage';

interface Params {
  params: {
    country: string;
  };
  searchParams: {
    category: string;
  };
}

export const metadata = {
  title: 'Categories',
  description: 'Top news by category!',
};

export default function Page({ params, searchParams }: Params) {
  return (
    <div>
      <h1 className="text-2xl mb-2">Search for top news by category</h1>

      <CategoriesPage country={params.country} initialCategory={searchParams.category} />
    </div>
  );
}
