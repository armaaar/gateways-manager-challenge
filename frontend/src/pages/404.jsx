import React from 'react';
import BasePage from '../components/BasePage';
import {Helmet} from 'react-helmet';
import {DEFAULT_TITLE} from '../utils/constants';

export default function NotFound() {
  return (
    <BasePage>
      <Helmet>
        <title>404 Not Found - {DEFAULT_TITLE}</title>
      </Helmet>
      <h2>The page you are looking for is not found!</h2>
    </BasePage>
  );
}
