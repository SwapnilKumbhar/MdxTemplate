import Link from 'next/link';

export default function Home() {
  return (
    <div className="container pt-32 mx-auto text-4xl font-light">
      Hello there! Check out these
      {' '}
      <span className="italic font-normal tracking-widest text-blue-600">
        <Link href="/posts">
          Posts.
        </Link>
      </span>
    </div>
  );
}
