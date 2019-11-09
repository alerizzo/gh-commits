import axios from 'axios';

const gitHubAPI = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

const getCommitsQuery = ({ owner, repository, refName, first, after }) => `{
  repository(owner:"${owner}", name:"${repository}") {
		ref(qualifiedName:"${refName}") {
      target {
        ... on Commit {
          id
          history(first: ${first || '20'}${after ? `, after: "${after}"` : ''}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                abbreviatedOid
                messageHeadline
                committedDate
                author {
                  name
                  email
                  avatarUrl
                }
                parents {
                  totalCount
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
    /^https:\/\/github\.com\/(?<owner>[^/]+)\/(?<repository>[^/]+)(?<hasRef>\/tree\/(?<refName>[^/]+))?\/?$/
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

export const fetchCommits = async (repository, options) => {
  try {
    const result = await gitHubAPI.post('', {
      query: getCommitsQuery({ ...repository, ...options }),
    });

    const history = result.data.data.repository.ref.target.history;

    return {
      entries: history.edges.map(entry => entry.node),
      hasNextPage: history.pageInfo.hasNextPage,
      endCursor: history.pageInfo.endCursor,
    };
  } catch (err) {
    throw err;
  }
};
