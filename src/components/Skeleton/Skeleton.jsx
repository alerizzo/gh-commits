import React from 'react';

const Skeleton = {};

Skeleton.Circle = ({ size, loading }) => {
  return (
    <div
      className={`Skeleton Skeleton_Circle ${loading ? 'loading' : ''}`}
      style={{ width: size, height: size }}></div>
  );
};

Skeleton.Text = ({ size, loading }) => {
  return (
    <div
      className={`Skeleton Skeleton_Text ${loading ? 'loading' : ''}`}
      style={{ width: size }}></div>
  );
};

export default Skeleton;
