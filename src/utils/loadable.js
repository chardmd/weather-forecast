import React, { lazy, Suspense } from 'react';

export const lazyLoad = (importFunc, selectorFunc, { fallback = null }) => {
  let lazyFactory = () => importFunc;

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
