import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteTable from './components/RouteTable';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouteTable />
  </React.StrictMode>
);
