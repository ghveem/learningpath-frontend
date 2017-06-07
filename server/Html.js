/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import config from '../src/config';
import head from './Meta';
import { SvgPolyfillScript, SvgPolyfillScriptInitalization } from './svgPolyfill';

const assets = process.env.NODE_ENV === 'development' ? require('./developmentAssets') : require('../htdocs/assets/assets'); // eslint-disable-line import/no-unresolved

const GoogleTagMangerNoScript = () => {
  if (config.googleTagMangerId) {
    return <noscript><iframe src={`//www.googletagmanager.com/ns.html?id=${config.googleTagMangerId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>;
  }
  return null;
};

const GoogleTagMangerScript = () => {
  if (config.googleTagMangerId) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
        (window,document,'script','dataLayer','${config.googleTagMangerId}');`,
        }}
      />
    );
  }
  return null;
};

const HotjarScript = () => {
  if (config.hotjarSiteID) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings={hjid:${config.hotjarSiteID},hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
    );
  }
  return null;
};


const Html = (props) => {
  const { lang, className, state, component } = props;
  const content = component ? renderToString(component) : '';

  return (
    <html lang={lang} className={className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        <SvgPolyfillScript className={className} />
        <link rel="stylesheet" type="text/css" href={`/assets/${assets['main.css']}`} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic,300|Signika:400,600,300,700" />
        <link rel="shortcut icon" href={`/assets/${assets['favicon.ico']}`} type="image/x-icon" />
      </head>
      <body>
        <GoogleTagMangerNoScript />
        <GoogleTagMangerScript />
        <div id="app-container" className="app-container" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.initialState = ${serialize(state)}` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.assets = ${serialize(assets)}` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.config = ${serialize(config)}` }} />
        <script src={`/assets/${assets['main.js']}`} />
        <SvgPolyfillScriptInitalization className={className} />
        <HotjarScript />
      </body>
    </html>
  );
};

Html.propTypes = {
  lang: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  component: PropTypes.node,
};

export default Html;
