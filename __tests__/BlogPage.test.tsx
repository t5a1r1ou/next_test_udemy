import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getPage, initTestHelpers } from 'next-page-tester';

initTestHelpers();

const handler = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    const query = req.url.searchParams;
    const _limit = query.get('_limit');

    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'dummy title 1',
            body: 'dummy body 1',
          },
          {
            userId: 2,
            id: 2,
            title: 'dummy title 2',
            body: 'dummy body 2',
          },
        ])
      );
    }
  }),
];

const server = setupServer(...handler);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('Blog page', () => {
  it('Should render the list of blogs pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/blog-page',
    });
    render(page);
    expect(await screen.findByText('blog page')).toBeInTheDocument();
    expect(screen.getByText('dummy title 1')).toBeInTheDocument();
    expect(screen.getByText('dummy title 2')).toBeInTheDocument();
  });
});
