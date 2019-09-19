import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import main from './pages/main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={main}/>
    </BrowserRouter>
  )
}
