const SELECT_TAB = 'SELECT_TAB';

function selectTab(index) {
  return {
    type: SELECT_TAB,
    index
  };
}

export default { selectTab };
