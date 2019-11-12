import React from 'react';
import { Skeleton } from 'components';
//import Gravatar from 'react-gravatar';

const moment = require('moment');

const CommitRow = ({ commit }) => {
  return (
    <div className="columns CommitRow">
      <div className="column is-2" title={commit.author.email}>
        <figure className="image is-28x28">
          <img className="is-rounded" src={commit.author.avatarUrl} alt={commit.author.name} />
          {/* author.avatarUrl is always present  */}
          {/* <Gravatar
            email={commit.author.email}
            size={28}
            rating="pg"
            default={commit.author.avatarUrl}
            className="is-rounded"
          /> */}
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
      <div className="column is-2">
        <Skeleton.Circle loading={loading} size="28px" />
        <Skeleton.Text loading={loading} size="60%" />
      </div>
      <div className="column is-2">
        <Skeleton.Text loading={loading} size="50%" />
      </div>
      <div className="column is-5">
        <Skeleton.Text loading={loading} size="70%" />
      </div>
      <div className="column is-3">
        <Skeleton.Text loading={loading} size="50%" />
      </div>
    </div>
  );
};

export default CommitRow;
