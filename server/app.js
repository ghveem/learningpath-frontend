/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import compression from 'compression';
import defined from 'defined';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import requestProxy from 'express-request-proxy';


import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import configureRoutes from '../src/main/routes';
import configureStore from '../src/configureStore';
import createMemoryHistory from './createMemoryHistory';
import config from '../src/config';
import webpackConfig from '../webpack.config.dev';
import { getHtmlLang, isValidLocale } from '../src/locale/configureLocale';
import Html from './Html';
import { getToken, isTokenExpired, getExpireTime } from './auth';
import Auth0SilentCallback from './Auth0SilentCallback';
import getConditionalClassnames from './getConditionalClassnames';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
    },
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler, {}));
}

app.use(compression());
app.use(express.static('htdocs', {
  maxAge: 1000 * 60 * 60 * 24 * 365, // One year
}));


const renderHtmlString = (locale, userAgentString, state = {}, component = undefined) =>
  renderToString(<Html lang={locale} state={state} component={component} className={getConditionalClassnames(userAgentString)} />);


const findIEClass = (userAgentString) => {
  if (userAgentString.indexOf('MSIE') >= 0) {
    return 'ie lt-ie11';
  } else if (userAgentString.indexOf('Trident/7.0; rv:11.0') >= 0) {
    return 'ie gt-ie10';
  }
  return '';
};

app.get('/pintrest-proxy/*', requestProxy({
  url: `${config.pintrestApiUrl}*`,
  query: {
    access_token: process.env.PINTREST_ACCESS_TOKEN,
  },
}));

app.get('/login/silent-callback', (req, res) => {
  res.send('<!doctype html>\n' + Auth0SilentCallback); // eslint-disable-line
});

app.get('/is_token_valid', (req, res) => {
  const idTokenExp = req.query.tokenExp;
  res.send({ isTokenExpired: isTokenExpired(idTokenExp), expiresIn: getExpireTime(idTokenExp) });
});

app.get('/get_token', (req, res) => {
  getToken().then((token) => {
    res.send(token);
  }).catch(err => res.status(500).send(err.message));
});

function handleResponse(req, res, token) {
  const paths = req.url.split('/');
  const locale = getHtmlLang(defined(paths[1], ''));
  const userAgentString = req.headers['user-agent'];


  if (global.__DISABLE_SSR__) { // eslint-disable-line no-underscore-dangle
    console.log('DISABLED SSR');
    //  res.send('<!doctype html>\n' + renderToString(<Html lang={lang} className={findIEClass(req.headers['user-agent'])} token={token}/>)); // eslint-disable-line
    const htmlString = renderHtmlString(locale, userAgentString, { accessToken: token.access_token });
    res.send(`<!doctype html>\n${htmlString}`);
    return;
  }
  const options = isValidLocale(paths[1]) ? { basename: `/${locale}/` } : {};
  const location = !options.basename ? req.url : req.url.replace(`${locale}/`, '');

  const memoryHistory = createMemoryHistory(req.url, options);

  const store = configureStore({ locale, accessToken: token.access_token }, memoryHistory);

  const history = syncHistoryWithStore(memoryHistory, store);
  console.log(store.getState());

  match({ history, routes: configureRoutes(store), basename: `/${locale}`, location }, (err, redirectLocation, props) => {
    if (err) {
    // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
    // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
    // if we got props, that means we found a valid component to render for the given route
      const component =
      (<Provider store={store}>
        <RouterContext {...props} />
      </Provider>);
      const state = store.getState();
      const htmlString = renderHtmlString(locale, userAgentString, state, component);
      const status = props.routes.find(r => r.status === 404) !== undefined ? 404 : 200;

      props.components
        .forEach((comp) => {
          console.log('---------');
          console.log(comp);
        });

      res.status(status).send(`<!doctype html>\n${htmlString}`);

    // Trigger sagas for components by rendering them (should not have any performance implications)
    // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
      // renderToString(component);
    // Dispatch a close event so sagas stop listening after they have resolved
      store.close();
    } else {
      res.sendStatus(500);
    }
  });
  console.log('SSR is ON!');
}

app.get('*', (req, res) => {
  getToken().then((token) => {
    handleResponse(req, res, token);
  }).catch(err => res.status(500).send(err.message));
});

module.exports = app;
