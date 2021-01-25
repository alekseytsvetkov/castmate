import React from 'react';
import { Input } from '@castmate/ui';
import { Search } from 'react-feather';

export const SearchBox = () => {
  return (
    <Input placeholder="Search by keywords" icon={<Search size={20} color="#8a919d" />} />
  );
};
