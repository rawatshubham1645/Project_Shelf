import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

function InvalidPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <div className="mx-auto max-w-xl space-y-6 p-8">
        <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 p-3 text-destructive">
          <AlertTriangle className="h-full w-full" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Invalid Access
        </h1>
        <h2 className="text-lg text-muted-foreground">
          You don't have permission to view this page
        </h2>
        <p className="text-muted-foreground">
          Please make sure you're logged in with the correct credentials or
          contact support for assistance.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="destructive">
            <Link to="/auth/login">Login Now</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InvalidPage;
