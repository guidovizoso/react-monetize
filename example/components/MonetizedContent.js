import React from 'react';
import { useContent } from 'react-monetize';

export default function () {
  const { isMonetized } = useContent();
  return (
    <React.Fragment>
      {isMonetized ? (
        <div>My premium content</div>
      ) : (
        <div>You need to subscribe to access premium content</div>
      )}
    </React.Fragment>
  );
}
