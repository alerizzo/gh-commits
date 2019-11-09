import React from 'react';
const moment = require('moment');

const CommitRow = ({ commit }) => {
  return (
    <div className="columns CommitRow">
      <div className="column is-2" title={commit.author.email}>
        <figure className="image is-24x24">
          <img className="is-rounded" src={commit.author.avatarUrl} alt={commit.author.name} />
        </figure>
        <strong>{commit.author.name}</strong>
      </div>
      <div className="column is-2">
        {commit.abbreviatedOid}
        {commit.parents.totalCount > 1 && <span className="tag is-primary is-light">Merge</span>}
      </div>
      <div className="column is-5">{commit.messageHeadline}</div>
      <div className="column is-3">
        <time dateTime={commit.commitedDate}>{moment(commit.committedDate).fromNow()}</time>
      </div>
    </div>
  );
};

CommitRow.Header = () => {
  return (
    <div className="columns CommitRow CommitRow_Header">
      <div className="column is-2">Author</div>
      <div className="column is-2">Commit</div>
      <div className="column is-5">Message</div>
      <div className="column is-3">Created</div>
    </div>
  );
};

CommitRow.Skeleton = ({ loading }) => {
  return (
    <div className="columns CommitRow">
      <div className="column is-2"></div>
      <div className="column is-2"></div>
      <div className="column is-5"></div>
      <div className="column is-3"></div>
    </div>
  );
};

export default CommitRow;
