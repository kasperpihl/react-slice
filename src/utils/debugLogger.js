export default (key, type, payload, prevState, nextState) => {
  if (typeof console.groupCollapsed !== 'undefined') {
    const title = [`react-slice dispatch on key:`, `%c${key}`];
    const styles = ['color: gray; font-weight: lighter;', ''];

    console.groupCollapsed(`%c ${title.join(' ')}`, ...styles);

    console.log(
      '%cprev state   ',
      'color: #9E9E9E; font-weight: bold;',
      prevState
    );
    console.log('%ctype         ', 'color: #03A9F4; font-weight: bold;', type);
    console.log(
      '%cpayload      ',
      'color: #03A9F4; font-weight: bold;',
      payload
    );
    console.log(
      '%cnext state   ',
      'color: #4CAF50; font-weight: bold;',
      nextState
    );
    console.groupEnd();
  }
};
