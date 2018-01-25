import React from 'react';
import PropTypes from 'prop-types';

const initalZendesk = () => {};

class ZendeskTest extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.addTicket = this.addTicket.bind(this);
  }
  toggleOpen() {
    console.log('YOYOOY');
    this.setState(prevState => ({
      open: !prevState.open,
      form: {
        description: '',
        email: '',
      },
    }));
  }

  addTicket(e) {
    e.preventDefault();
    const eer = {
      request: {
        subject: 'Læringsstitest',
        comment: { body: 'The smoke is very colorful.' },
        // comment: { body: 'ddInnsendt fra: ', uploads: [] },
        requester: { name: 'cc', email: 'cc@knowit.no', locale_id: 34 },
      },
    };

    const bodyt = {
      request: {
        subject: 'My printer is on fire!',
        comment: { body: 'The smoke is very colorful.' },
        priority: 'urgent',
      },
    };
    this.toggleOpen();
    const url = 'https://ndla.zendesk.com/api/v2/requests.json';

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eer),
    }).then(res => {
      console.log(res);
    });
  }
  render() {
    const classname = this.state.open ? 'zendesk zendesk--open' : 'zendesk';
    return (
      <div>
        <button className="button zendesk__button" onClick={this.toggleOpen}>
          Spør NDLA
        </button>
        <div className={classname}>
          <button className="button" onClick={this.toggleOpen}>
            Avbryt
          </button>
          <button onClick={this.addTicket}>Send inn</button>
        </div>
      </div>
    );
  }
}

export default ZendeskTest;
