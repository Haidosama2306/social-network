import { INIT_STATE } from '../../constant';
import { createMessage, getMessages, getType, getUsersMessage } from '../actions/message';

export default function postsReducers(state = INIT_STATE.message, action) {
  switch (action.type) {
    case getType(getMessages.getMessageRequest):
 
      return {
        ...state,
        isLoading: true,
      };
    case getType(getMessages.getMessageSuccess):

      return {
        ...state,
        isLoading: false,
        data: action.payload.messages,
        room: action.payload.room
      };
      case getType(getUsersMessage.getUsersMessageSuccess):
      return {
        ...state,
        users: action.payload
      };
      case getType(getUsersMessage.getUsersMessageRequest):
      return {
        ...state,
        isLoading: false,
      };
      case getType(getUsersMessage.getUsersMessageFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(getMessages.getMessageFailure):
      return {
        ...state,
        isLoading: false,
      };
      
      case getType(createMessage.createMessageSuccess):
        const messages= state.data.data|| state.data
        return {
          ...state,
          data: [...state.data, action.payload],
        };
    default:
      return state;
  }
}