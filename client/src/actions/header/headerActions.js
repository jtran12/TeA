const SELECT_TAB = 'SELECT_TAB';

export function selectTab(index) {
  return {
    type: SELECT_TAB,
    index
  };
}
