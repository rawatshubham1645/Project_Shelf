import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-xl p-12 text-center bg-card rounded-lg border-2 border-border shadow-lg">
        <div className="mb-8">
          <h1 className="text-8xl font-black text-primary">404</h1>
          <h2 className="text-2xl font-bold text-foreground mt-6">
            Page Not Found
          </h2>
        </div>
        <p className="text-base text-muted-foreground mb-10">
          Sorry, we can't find the page you're looking for.
        </p>
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          <span>←</span> Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;