import React from 'react';
import CommitRow from './CommitRow';

const CommitsList = React.forwardRef(({ commits, hasLoadingRow }, ref) => {
  return (
    <div className="CommitsList" ref={ref}>
      {commits.map(commit => (
        <CommitRow key={commit.abbreviatedOid} commit={commit} />
      ))}
      {hasLoadingRow && <CommitRow.Skeleton loading />}
    </div>
  );
});

CommitsList.Skeleton = ({ rows, loading }) => {
  return (
    <div className="CommitsList">
      {new Array(rows).fill(null).map((entry, index) => (
        <CommitRow.Skeleton key={index} loading={loading} />
      ))}
    </div>
  );
};

export default CommitsList;
