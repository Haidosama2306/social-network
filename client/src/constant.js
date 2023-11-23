export const INIT_STATE = {
    posts: {
        isLoading: false,
        data: [],
    },
    auth: {
        isLoading: false,
        auth: false,
        data: '',
      },
      message:{
        isLoading: false,
        data:[],
        users: [],
        room: ''
      },
      modal:{
        isOpen: false
      },
      modalSearch:{
        isShow: false
      }
};