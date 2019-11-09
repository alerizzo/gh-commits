import React from 'react';
import CommitRow from './CommitRow';

const CommitsList = ({ commits }) => {
  return (
    <div className="CommitsList">
      {commits.map(commit => (
        <CommitRow key={commit.abbreviatedOid} commit={commit} />
      ))}
    </div>
  );
};

CommitsList.Skeleton = ({ message, rows, loading }) => {
  return <div></div>;
};

export default CommitsList;
