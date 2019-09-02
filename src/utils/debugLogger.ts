export default <Actions, State>(
  name: string,
  action: Actions,
  prevState: State,
  nextState: State
) => {
  if (typeof console.groupCollapsed !== 'undefined') {
    const title = [`react-slice`, `%c${name}`];
    const styles = ['color: gray; font-weight: lighter;', ''];

    console.groupCollapsed(`%c ${title.join(' ')}`, ...styles);

    console.log(
      '%cprev state   ',
      'color: #9E9E9E; font-weight: bold;',
      prevState
    );
    console.log('%caction      ', 'color: #03A9F4; font-weight: bold;', action);
    console.log(
      '%cnext state   ',
      'color: #4CAF50; font-weight: bold;',
      nextState
    );
    console.groupEnd();
  }
};
