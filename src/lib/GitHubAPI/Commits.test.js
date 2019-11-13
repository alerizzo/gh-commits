import { parseGitHubURL, filterCommits } from './Commits';

describe('parsing GitHub URLs', () => {
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
});

describe('filters commits', () => {
  const commitsToTest = [
    {
      abbreviatedOid: 'sH7gUkj8',
      author: {
        name: 'John Doe',
        email: 'jdoe@company.com',
      },
      messageHeadline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      abbreviatedOid: 'sH7gUkj3',
      author: {
        name: 'Tyler Durden',
        email: 'tdurden@paperstsoap.co',
      },
      messageHeadline: 'Sed nisi ligula, feugiat a leo non, fringilla interdum felis.',
    },
    {
      abbreviatedOid: 'sH7gUkj2',
      author: {
        name: 'John Doe',
        email: 'jdoe@company.com',
      },
      messageHeadline: 'Praesent vitae fringilla turpis, vitae accumsan ipsum.',
    },
  ];

  const expectedResultingArray_1 = [commitsToTest[0], commitsToTest[2]];

  it('matches by name, case insensitive', () => {
    expect(filterCommits(commitsToTest, 'john doe')).toEqual(expectedResultingArray_1);
  });

  it('matches by description', () => {
    expect(filterCommits(commitsToTest, 'ipsum')).toEqual(expectedResultingArray_1);
  });

  it('empty on no matches', () => {
    expect(filterCommits(commitsToTest, '123456789')).toEqual([]);
  });

  it('matches all', () => {
    expect(filterCommits(commitsToTest, 'sH7gUkj')).toEqual(commitsToTest);
  });
});
