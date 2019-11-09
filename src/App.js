import React, { useState } from 'react';
import './App.scss';

import { Layout, RepositorySearch } from 'components';
import { CommitsPage } from 'pages';

function App() {
  const [repository, setRepository] = useState(null);

  const repositorySearch = (
    <RepositorySearch onLoadRepository={repoToLoad => setRepository(repoToLoad)} />
  );

  return (
    <Layout navbar={repositorySearch}>
      <CommitsPage repository={repository} />
    </Layout>
  );
}

export default App;
