import { combineReducers } from 'redux';

import documentsReducer from './reducers/documents/documentReducer';
import chatsReducer from './reducers/chats/chatsReducer';
import userReducer from './reducers/user/userReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const rootReducer = combineReducers({
  user: userReducer,
  documents: documentsReducer,
  chats: chatsReducer,
});

export default rootReducer;
