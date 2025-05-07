import React from 'react';
import { Input } from '../input';

export function TableSearch({ searchQuery, setSearchQuery, searchKey, setSearchKey }) {
  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-64"
      />
      <select
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
      >
        <option value="title">Title</option>
        <option value="status">Status</option>
        <option value="id">Form ID</option>
      </select>
    </div>
  );
}
