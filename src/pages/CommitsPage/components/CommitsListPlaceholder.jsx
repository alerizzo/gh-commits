import React from 'react';
import { CommitsList } from 'components';

function CommitsListPlaceholder({ message, loading }) {
  return (
    <div className="CommitsListPlaceholder">
      <CommitsList.Skeleton rows={3} loading={loading} />
      {message && <div className="overlay is-size-5 has-text-weight-bold">{message}</div>}
    </div>
  );
}

export default CommitsListPlaceholder;
