import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Homepage } from '../components/Homepage/Homepage';

it('homepage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Homepage />, div);
});
