import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { Heading1, Heading2 } from '../../Components/Heading';
import Paragraph from '../../Components/Paragraph';
import { getAllPosts, FrontMatter } from '../../lib/blog';

type Props = {
  source: MDXRemoteSerializeResult,
  metadata: FrontMatter
};

// Main component
export default function Page({ source, metadata }: Props) {
  return (
    <div>
      {/* Show the title and author according to the FrontMatter data we added */}
      <h1 className="pt-8 pb-4 text-3xl text-center">
        {metadata.title}
      </h1>
      <p className="italic text-center">
        by
        {' '}
        {metadata.author}
        .
      </p>
      <br />

      {/* Render the content of the page */}
      <p className="container px-64 mx-auto">

        <MDXRemote
          {...source}
          components={{
            h1: Heading1,
            h2: Heading2,
            p: Paragraph,
          }}
        />

      </p>
    </div>
  );
}

// The context we receive here has params that we exported from getStaticPaths
export async function getStaticProps(context: { params: { slug: string } }) {
  const posts = await getAllPosts();

  // Find the post that corresponds to the slug we need
  const currentPost = posts.find((post) => post.metadata.slug === context.params.slug);

  // Nullcheck. Ideally, this will never be null.
  if (!currentPost) {
    return {
      props: {
        source: '',
        metadata: {
          title: '404',
          author: 'Not found',
          slug: context.params.slug,
        },
      },
    };
  }

  // serialize this using MDX's serialize
  const compiledSource = await serialize(currentPost.content);

  // return these as props. The component will consume these now.
  return { props: { source: compiledSource, metadata: currentPost.metadata } };
}

export async function getStaticPaths() {
  // Retrieve all slugs
  const posts = await getAllPosts();

  // construct paths
  const paths = posts.map((post) => ({
    params: {
      slug: post.metadata.slug,
    },
  }));

  // fallback false will ensure that paths will 404
  return {
    paths,
    fallback: false,
  };
}
