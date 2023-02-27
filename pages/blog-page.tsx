import { FC } from 'react';
import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import { getAllPostsData } from '../lib/fetch';
import { POST } from '../types/types';
import Post from '../components/Post';

type STATIC_PROPS = {
  posts: POST[];
};

const BlogPage: FC<STATIC_PROPS> = ({ posts }) => {
  return (
    <Layout title="Blog">
      <p className="text-4xl mb-10">blog page</p>
      <ul>{posts && posts.map((post) => <Post key={post.id} {...post} />)}</ul>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData();
  return {
    props: { posts },
  };
};
