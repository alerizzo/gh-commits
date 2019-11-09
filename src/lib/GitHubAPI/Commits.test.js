import { parseGitHubURL } from './Commits';

it('parses URL of master', () => {
  const parsedURL = parseGitHubURL('https://github.com/face-book/rea.ct');
  expect(parsedURL).toMatchObject({
    owner: 'face-book',
    repository: 'rea.ct',
    refName: 'master',
  });
});

it('parses URL of any other branch', () => {
  const parsedURL = parseGitHubURL('https://github.com/face-book/rea_ct/tree/16.8.6');
  expect(parsedURL).toMatchObject({
    owner: 'face-book',
    repository: 'rea_ct',
    refName: '16.8.6',
  });
});

it('returns null for invalid URLs', () => {
  const parsedURL = parseGitHubURL('https://www.google.com');
  expect(parsedURL).toBeNull();
});
