import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/fetch';
import { POST } from '../../types/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import { FC } from 'react';

const PostDetail: FC<POST> = ({ id, title, body }) => {
  return (
    <Layout title={title}>
      <p className="m-4">
        {'ID : '}
        {id}
      </p>
      <p className="mb-4 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{body}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
          <a data-testid="back-blog">Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string);
  return {
    props: {
      ...post,
    },
  };
};
