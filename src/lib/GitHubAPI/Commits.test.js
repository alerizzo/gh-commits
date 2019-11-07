import { parseGitHubURL } from './Commits';

it('parses URL of master', () => {
  const parsedURL = parseGitHubURL('https://github.com/facebook/react');
  expect(parsedURL).toMatchObject({
    owner: 'facebook',
    repository: 'react',
    refName: 'master',
  });
});

it('parses URL of any other branch', () => {
  const parsedURL = parseGitHubURL('https://github.com/facebook/react/tree/16.8.6');
  expect(parsedURL).toMatchObject({
    owner: 'facebook',
    repository: 'react',
    refName: '16.8.6',
  });
});

it('returns null for invalid URLs', () => {
  const parsedURL = parseGitHubURL('https://www.google.com');
  expect(parsedURL).toBeNull();
});
