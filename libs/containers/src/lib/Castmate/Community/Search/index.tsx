import React from 'react';
import { Input } from '@castmate/ui';
import { Search } from 'react-feather';
import styled from 'styled-components';

export const SearchBox = () => {
  return (
    <Input isFirst placeholder="Search by keywords"  icon={<Search size={20} color="#8a919d" />} />
  );
};
