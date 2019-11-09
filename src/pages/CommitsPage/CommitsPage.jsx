import React, { useEffect, useState } from 'react';
import { fetchCommits } from 'lib/GitHubAPI/Commits';

import CommitsPageHeader from './components/CommitsPageHeader';
import { CommitsList } from 'components';

function CommitsPage({ repository }) {
  const [commits, setCommits] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (repository && (!commits || commits.url !== repository.url)) {
      setLoading(true);
      fetchCommits(repository)
        .then(result => {
          // clear previous error, if any
          if (error) setError(null);

          // store result in state, and add repository metadata
          setCommits({ ...repository, ...result });
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [repository, commits, error]);

  const handleSearch = () => {};

  const isBlank = !loading && !repository,
    isEmpty = !loading && !!repository && commits && commits.entries.length === 0,
    isError = !loading && !!error,
    isOk = !loading && !error && commits && commits.entries.length > 0;

  console.dir(commits);

  return (
    <div className="CommitsPage">
      <CommitsPageHeader
        onSearch={handleSearch}
        repository={repository}
        disabled={!isOk}
        showTableHeader={isOk}
      />
      {isOk && <CommitsList commits={commits.entries} />}
    </div>
  );
}

export default CommitsPage;
