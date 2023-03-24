interface PageParams {
  id: string;
}

export async function generateMetadata({ params }: { params: PageParams }) {
  return { title: params.id, description: params.id };
}

export default function Page({ params }: { params: PageParams }) {
  return <div>Story {params.id}</div>;
}
