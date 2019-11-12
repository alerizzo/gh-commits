import React, { useEffect } from 'react';
import { TextInput } from 'components';
import CommitRow from 'components/CommitsList/CommitRow';
import { useInput } from 'lib/hooks';
import './CommitsPageHeader.scss';

export default function CommitsPageHeader({
  onSearch,
  isSearching,
  repository,
  disabled,
  showTableHeader,
}) {
  const searchInput = useInput('');

  useEffect(() => {
    onSearch && onSearch(searchInput.value);
  }, [searchInput.value, onSearch]);

  return (
    <div className="CommitsPageHeader">
      <h1 className="title is-3">Commits List</h1>
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
        <TextInput
          style={{ width: '276px' }}
          disabled={disabled}
          isLoading={isSearching}
          placeholder="Search ..."
          {...searchInput}
        />
      </div>
      {showTableHeader && (
        <div className="CommitsPageHeader_TableHeader">
          <CommitRow.Header />
        </div>
      )}
    </div>
  );
}
