import React from 'react';

function MobileError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-untyped">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">This application is not available on mobile devices.</p>
    </div>
  );
}

export default MobileError;
