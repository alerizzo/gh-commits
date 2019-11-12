import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchCommits } from 'lib/GitHubAPI/Commits';
import debounce from 'lodash.debounce';

import CommitsPageHeader from './components/CommitsPageHeader/CommitsPageHeader';

import { CommitsList, Page } from 'components';

function CommitsPage({ repository }) {
  const PAGE_SIZE = 30;

  const [commits, setCommits] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchTerms, setSearchTerms] = useState(null);
  const [visibleRows, setVisibleRows] = useState(PAGE_SIZE);

  const listRef = useRef(null);

  // on update
  useEffect(() => {
    if (repository && (!commits || commits.url !== repository.url)) {
      setLoading(true);
      fetchCommits(repository, { first: PAGE_SIZE })
        .then(result => {
          // clear previous error, if any
          if (error) setError(null);

          // store result in state, and add repository metadata
          setVisibleRows(PAGE_SIZE);
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
    debounce(searchInput => {
      if (searchInput === '') setVisibleRows(PAGE_SIZE);
      setSearchTerms((searchInput || '').toLowerCase());
    }, 500),
    []
  );

  const loadMoreCommits = useCallback(
    commits => {
      if (!loadingMore && commits.hasNextPage) {
        setLoadingMore(true);
        fetchCommits(repository, { after: commits.endCursor, first: searchTerms ? 100 : PAGE_SIZE })
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
    [loadingMore, repository, searchTerms]
  );

  useEffect(() => {
    // check if I need more rows while searching
    if (!loadingMore && listRef && listRef.current) {
      const listBoundaries = listRef.current.getBoundingClientRect();
      if (
        listBoundaries.bottom - 50 <
          (window.innerHeight || document.documentElement.clientHeight) &&
        searchTerms
      ) {
        loadMoreCommits(commits);
      }
    }
  }, [commits, searchTerms, loadMoreCommits, loadingMore]);

  const handleScrollEnd = useCallback(() => {
    setVisibleRows(visibleRows => (visibleRows += PAGE_SIZE));
    if (!(!searchTerms && commits.entries.length > visibleRows)) {
      loadMoreCommits(commits);
    }
  }, [commits, loadMoreCommits, searchTerms, visibleRows]);

  // define how commits will be filtered
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

  // get the actual subset of commits to render
  const commitsToRender = isOk
    ? searchTerms
      ? commits.entries.filter(entriesFilter)
      : commits.entries.slice(0, visibleRows)
    : [];

  // render component
  return (
    <Page title="Commits" className="CommitsPage" onScrollEnd={handleScrollEnd}>
      <CommitsPageHeader
        onSearch={handleSearch}
        isSearching={loadingMore && searchTerms}
        repository={repository}
        disabled={!isOk}
        showTableHeader={isOk}
      />
      {loading && <CommitsList.Placeholder message="Fetching commits ..." loading />}
      {isBlank && <CommitsList.Placeholder message="Your commits will show up here" />}
      {isEmpty && (
        <CommitsList.Placeholder message="There are no commits in this respository yet" />
      )}
      {isError && (
        <CommitsList.Placeholder message="We couldn’t get the commits for this repository" />
      )}
      {isOk && (
        <CommitsList ref={listRef} commits={commitsToRender} hasLoadingRow={commits.hasNextPage} />
      )}
    </Page>
  );
}

export default CommitsPage;
