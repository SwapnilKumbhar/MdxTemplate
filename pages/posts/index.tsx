import Link from 'next/link';
import { BlogPost, getAllPosts } from '../../lib/blog';

type Props = {
  posts: BlogPost[]
};

export default function Posts({ posts }: Props) {
  const postList = posts.map((post) => (
    <p className="pl-4 text-lg font-light">
      <b className="text-blue-600">
        <Link href={`/posts/${post.metadata.slug}`}>
          {post.metadata.title}

        </Link>
      </b>
      {' '}
      -
      {' '}
      {post.metadata.author}
      {' '}
      <br />
    </p>
  ));

  return (
    <div className="container py-32 mx-auto">
      <h1 className="pb-4 text-4xl font-light">
        List of Posts
      </h1>
      <p>
        {postList}
      </p>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();

  return { props: { posts } };
}
