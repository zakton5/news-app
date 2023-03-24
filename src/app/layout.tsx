import Header from './components/Header/Header';
import './globals.css';

export const metadata = {
  title: 'News App',
  description: 'See the latest news!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center bg-gray-100">
        <Header />

        <main className="p-4 h-full max-w-screen-xl">{children}</main>
      </body>
    </html>
  );
}
