// src/actions.js
export function addTodo (todo) {
  return { type: 'ADD_TODO', todo: todo  }
}

// test/actions.js
import test from 'tape'
import * as actions from '../src/actions'

test('addTodo action creator', function () {
  t.plan(1)
  const payload = { id: null, title: 'The title!', body: 'The post body' }
  t.deepEqual(action.addTodo(payload), { type: 'ADD_TODO', todo: payload } )
})
