import createInitialHeaderState from '../../state/header/headerState';

export default function headerReducer(state = createInitialHeaderState(), action) {

  switch (action.type) {

    case 'SELECT_TAB':
      return Object.assign({}, state, {index: action.index });

    default:
      return state;
  }
}
