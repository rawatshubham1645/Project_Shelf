import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

export function ResponseTable({ responses }) {
  if (!responses?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No responses yet
      </div>
    );
  }

  // Get all unique field IDs from responses
  const fields = Object.keys(responses[0]?.answers || {});

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submission Date</TableHead>
            <TableHead>Email</TableHead>
            {fields.map((field) => (
              <TableHead key={field}>{field}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map((response, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(new Date(response.submittedAt), 'PPpp')}
              </TableCell>
              <TableCell>{response.email || 'N/A'}</TableCell>
              {fields.map((field) => (
                <TableCell key={field}>
                  {response.answers[field]?.toString() || 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
