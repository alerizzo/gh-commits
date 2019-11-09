import React, { useEffect } from 'react';
import debounce from 'lodash.debounce';

const Page = ({ title, onScrollEnd, className, children, ...other }) => {
  const scrollEndHandler =
    onScrollEnd &&
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 100
      ) {
        onScrollEnd();
      }
    }, 100);

  // on mount
  useEffect(() => {
    document.title = `Codacy - ${title}`;

    // bind scroll event
    if (onScrollEnd) {
      window.addEventListener('scroll', scrollEndHandler);
    }

    return () => {
      // unbind scroll event
      if (onScrollEnd) {
        window.removeEventListener('scroll', scrollEndHandler);
      }
    };
  });

  return (
    <div className={`Page ${className}`} {...other}>
      {children}
    </div>
  );
};

export default Page;
