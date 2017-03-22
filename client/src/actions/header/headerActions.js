const SELECT_TAB = 'SELECT_TAB';

export default function selectTab(index) {
  return {
    type: SELECT_TAB,
    index
  };
}
