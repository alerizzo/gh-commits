import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchCommits } from 'lib/GitHubAPI/Commits';
import debounce from 'lodash.debounce';

import CommitsPageHeader from './components/CommitsPageHeader';
import CommitsListPlaceholder from './components/CommitsListPlaceholder';

import { CommitsList, Page } from 'components';

function CommitsPage({ repository }) {
  const [commits, setCommits] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchTerms, setSearchTerms] = useState(null);

  const listRef = useRef(null);

  // on update
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
          setCommits({ ...repository });
          setError(err);
          setLoading(false);
        });
    }
  }, [repository, commits, error]);

  const handleSearch = useCallback(
    debounce(searchTerms => {
      setSearchTerms((searchTerms || '').toLowerCase());
    }, 500),
    []
  );

  const loadMoreCommits = useCallback(
    commits => {
      if (!loadingMore && commits.hasNextPage) {
        setLoadingMore(true);
        fetchCommits(repository, { after: commits.endCursor })
          .then(result => {
            // add entries to previous result, and update cursors
            setCommits(prevCommits => {
              return {
                ...prevCommits,
                entries: [...prevCommits.entries, ...result.entries],
                hasNextPage: result.hasNextPage,
                endCursor: result.endCursor,
              };
            });

            setLoadingMore(false);
          })
          .catch(err => {});
      }
    },
    [loadingMore, repository]
  );

  useEffect(() => {
    // check if I need more rows
    if (!loadingMore && listRef && listRef.current) {
      const listBoundaries = listRef.current.getBoundingClientRect();
      if (
        listBoundaries.bottom - 50 <
        (window.innerHeight || document.documentElement.clientHeight)
      ) {
        loadMoreCommits(commits);
      }
    }
  }, [commits, searchTerms, loadMoreCommits, loadingMore]);

  const entriesFilter = commit =>
    (commit.abbreviatedOid && commit.abbreviatedOid.toLowerCase().indexOf(searchTerms) >= 0) ||
    (commit.author.name && commit.author.name.toLowerCase().indexOf(searchTerms) >= 0) ||
    (commit.author.email && commit.author.email.toLowerCase().indexOf(searchTerms) >= 0) ||
    (commit.messageHeadline && commit.messageHeadline.toLowerCase().indexOf(searchTerms) >= 0);

  // define different possible states of my list
  const isBlank = !loading && !repository,
    isEmpty =
      !loading && !!repository && commits && commits.entries && commits.entries.length === 0,
    isError = !loading && !!error,
    isOk = !loading && !error && commits && commits.entries && commits.entries.length > 0;

  // render component
  return (
    <Page title="Commits" className="CommitsPage" onScrollEnd={() => loadMoreCommits(commits)}>
      <CommitsPageHeader
        onSearch={handleSearch}
        repository={repository}
        disabled={!isOk}
        showTableHeader={isOk}
      />
      {loading && <CommitsListPlaceholder message="Fetching commits ..." loading />}
      {isBlank && <CommitsListPlaceholder message="Your commits will show up here" />}
      {isEmpty && <CommitsListPlaceholder message="There are no commits in this respository yet" />}
      {isError && (
        <CommitsListPlaceholder message="We couldn’t get the commits for this repository" />
      )}
      {isOk && (
        <CommitsList
          ref={listRef}
          commits={searchTerms ? commits.entries.filter(entriesFilter) : commits.entries}
          hasLoadingRow={commits.hasNextPage}
        />
      )}
    </Page>
  );
}

export default CommitsPage;
