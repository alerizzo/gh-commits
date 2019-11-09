import React from 'react';
import { TextInput } from 'components';
import CommitRow from 'components/CommitsList/CommitRow';

export default function CommitsPageHeader({ onSearch, repository, disabled, showTableHeader }) {
  return (
    <div className="CommitsPageHeader">
      <h1 className="title is-3">Commits list</h1>
      <div className="field">
        <label className="label is-size-6">
          Search
          {repository && (
            <span className="has-text-weight-light">
              {' in '}
              {repository.owner}'s {repository.repository} ({repository.refName})
            </span>
          )}
        </label>
        <TextInput style={{ maxWidth: '50%' }} disabled={disabled} placeholder="Search ..." />
      </div>
      {showTableHeader && (
        <div className="CommitsPageHeader_TableHeader">
          <CommitRow.Header />
        </div>
      )}
    </div>
  );
}
