/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/HomePage/Loadable';
import { useTranslation } from 'react-i18next';
import { MainLayout } from 'app/components/MainLayout';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <meta name="description" content="ISA Users" />
      </Helmet>
      <Switch>
        <>
          <MainLayout>
            <Route component={HomePage} />
          </MainLayout>
        </>
      </Switch>
    </BrowserRouter>
  );
}
