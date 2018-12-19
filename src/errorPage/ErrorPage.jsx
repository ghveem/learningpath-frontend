/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Wrapper, OneColumn, Footer } from '../common/Layout';
import Logo from '../common/Logo';
import { DefaultErrorMessage } from './DefaultErrorMessage';

const ErrorPage = () => (
  <Wrapper>
    <OneColumn>
      <div className="masthead_wrapper">
        <div className="masthead">
          <div className="masthead_left--desktop">
            <Logo />
          </div>
        </div>
      </div>
      <DefaultErrorMessage />
    </OneColumn>
    <Footer />
  </Wrapper>
);
export default ErrorPage;