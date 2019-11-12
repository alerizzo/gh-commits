import React from 'react';
import CommitRow from './CommitRow';
import './CommitsList.scss';

const CommitsList = React.forwardRef(({ commits, hasLoadingRow }, ref) => {
  if (!commits) return <CommitsList.Skeleton />;

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
      {new Array(rows || 3).fill(null).map((entry, index) => (
        <CommitRow.Skeleton key={index} loading={loading} />
      ))}
    </div>
  );
};

CommitsList.Placeholder = ({ rows, message, loading }) => {
  return (
    <div className="CommitsList_Placeholder">
      <CommitsList.Skeleton rows={rows} loading={loading} />
      {message && <div className="overlay is-size-5 has-text-weight-bold">{message}</div>}
    </div>
  );
};

export default CommitsList;
