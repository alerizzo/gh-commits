import axios from 'axios';

const gitHubAPI = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const getCommitsQuery = ({ owner, repository, refName, first }) => `{
  repository(owner:"${owner}", name:"${repository}") {
		ref(qualifiedName:"${refName}") {
      target {
        ... on Commit {
          id
          history(first: ${first || '10'}) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                abbreviatedOid
                message
                committedDate
                author {
                  name
                  email
                  avatarUrl
                }
              }
            }            
          }
        }
      }
    }
  }
}`;

export const parseGitHubURL = url => {
  // GitHub URL for master --> https://github.com/[owner]/[repo]
  // GitHub URL for any other branch --> https://github.com/[owner]/[repo]/tree/[ref]

  let result = url.match(
    /^https:\/\/github\.com\/(?<owner>\w+)\/(?<repository>\w+)(?<hasRef>\/tree\/(?<refName>[^/]+))?\/?$/
  );

  if (result) {
    const { owner, repository, hasRef, refName } = result.groups;

    return {
      owner,
      repository,
      refName: hasRef ? refName : 'master',
    };
  }

  return null;
};

export const fetchCommits = (gitHubURL, options) => {
  const parsedUrl = parseGitHubURL(gitHubURL);

  gitHubAPI
    .post('', {
      query: getCommitsQuery({ ...parsedUrl, ...options }),
    })
    .then(result => {
      return result;
    });
};
