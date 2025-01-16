import { combineReducers } from 'redux';

import documentsReducer from './reducers/documents/documentReducer';
import chatsReducer from './reducers/chats/chatsReducer';
import userReducer from './reducers/user/userReducer';
import escalationsReducer from './reducers/escalation/escalationReducer';
import followupsReducer from './reducers/followup/followupReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const appReducer = combineReducers({
  user: userReducer,
  documents: documentsReducer,
  chats: chatsReducer,
  escalations: escalationsReducer,
  followups: followupsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined; 
  }
  return appReducer(state, action);
};

export default rootReducer;
