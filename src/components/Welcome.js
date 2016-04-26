import React from 'react';
import Form from 'react-router-form';
import Logo from './Logo';
import SiteNav from './SiteNav';
import polyglot from '../i18n';

export default class Welcome extends React.Component {
  getChildContext () {
    return {
      lang: 'nb'
    };
  }

  render () {
    return (
      <div>
        <div className='hero'>
          <div className='frontpage-masthead'>
            <div className='frontpage-masthead_left'>
              <Logo cssModifier='on-dark' />
            </div>
            <div className='frontpage-masthead_right'>
              <SiteNav cssModifier='on-dark' />
            </div>
          </div>

          <h1 className='hero_title'>{polyglot.t('welcomePage.title1')}</h1>
          <h3 className='hero_title'>{polyglot.t('welcomePage.title2')}</h3>

          <Form to='/learningpaths' method='GET' className='search-form search-form--on-dark'>
            <input type='text' name='query' placeholder={polyglot.t('welcomePage.placeholder')} className='search-form_query' />
            <input type='submit' className='search-form_btn button' value={polyglot.t('welcomePage.searchBtn')} />
          </Form>

          <a href='#feature' className='hero_link cta-link cta-link--negative'>{polyglot.t('welcomePage.explanationBtn')}</a>
          <a href='/login' className='hero_link cta-link cta-link-secondary cta-link--secondary-negative'>{polyglot.t('welcomePage.newBtn')} »</a>
        </div>
        <div className='infoblock'>
          <div className='infoblock'>
            <div className='infoblock_text'>
              <h2 id="feature">{polyglot.t('welcomePage.feature1Title')}</h2>
              <p>{polyglot.t('welcomePage.feature1Content')}</p>
            </div>
            <img src="http://placehold.it/300x200" className='infoblock_img' />
          </div>
        </div>
        <div className='infoblock'>
          <div className='infoblock'>
            <div className='infoblock_text infoblock_text--left' >
              <h2>{polyglot.t('welcomePage.feature2Title')}</h2>
              <p>{polyglot.t('welcomePage.feature2Content')}</p>
            </div>
            <img src="http://placehold.it/300x200" className='infoblock_img infoblock_img--left' />
          </div>
        </div>
      </div>
    );
  }
}

Welcome.childContextTypes = {
  lang: React.PropTypes.string
};
