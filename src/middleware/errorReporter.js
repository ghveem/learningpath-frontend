const errorReporter = store => next => action => {
  if (action.error) {
    const err = action.payload;
    if (err.status) {
      let json = err.json;
      console.error(`${err.status} ${err.message}: ${json.code} ${json.description}. %o`, json.messages);
    } else {
      console.error(action.payload, action, store.getState()); // eslint-disable-line no-console
    }
  }

  return next(action);
};

export default errorReporter;
