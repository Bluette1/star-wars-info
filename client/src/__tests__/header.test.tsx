import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/header';

test.skip('renders learn react link', () => {
  const header = render(<Header />);
  expect(header).toMatchSnapshot();
});
