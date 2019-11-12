import React from 'react';
import { useInput } from 'lib/hooks';
import { TextInput, Button } from 'components';
import { parseGitHubURL } from 'lib/GitHubAPI/Commits';
import './RepositorySearch.scss';

function RepositorySearch({ onLoadRepository }) {
  const repositoryUrlInput = useInput('');

  const handleSubmit = event => {
    event.preventDefault();

    const parsedURL = parseGitHubURL(repositoryUrlInput.value);

    if (parsedURL && onLoadRepository) {
      onLoadRepository({ url: repositoryUrlInput.value, ...parsedURL });
    }
  };

  const isValidUrl = parseGitHubURL(repositoryUrlInput.value) !== null;
  const isEmpty = !repositoryUrlInput.value;

  return (
    <form className="RepositorySearch" onSubmit={handleSubmit}>
      <label>Repository URL</label>
      <TextInput
        name="repository_url"
        className={!isEmpty && isValidUrl ? 'is-primary' : null}
        isInvalid={!isEmpty && !isValidUrl}
        invalidMessage={'This URL is not valid'}
        placeholder="Add your repository URL here"
        {...repositoryUrlInput}
      />
      <Button isSubmit disabled={isEmpty || !isValidUrl}>
        Load repository
      </Button>
    </form>
  );
}

export default RepositorySearch;
