import { combineReducers } from 'redux';

import documentsReducer from './reducers/documents/documentReducer';
import chatsReducer from './reducers/chats/chatsReducer';
import userReducer from './reducers/user/userReducer';
import escalationsReducer from './reducers/escalation/escalationReducer';
import followupsReducer from './reducers/followup/followupReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const rootReducer = combineReducers({
  user: userReducer,
  documents: documentsReducer,
  chats: chatsReducer,
  escalations: escalationsReducer,
  followups: followupsReducer
});

export default rootReducer;
