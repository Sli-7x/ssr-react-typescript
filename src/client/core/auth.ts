import Api from './api';

export default {
  login(data: any) {
    return Api.post('login', data).then((res: any) => {
      if (res.success && typeof sessionStorage !== 'undefined') {
        sessionStorage.token = res.content.token;
      }

      return res;
    });
  },

  // @todo
  // Logout
  logout(props: any) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('token');
      props.history.push('/');
    }
  },

  // Get token
  getToken() {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.token;
    }
  },

  // Check if logged in
  loggedIn() {
    if (typeof sessionStorage !== 'undefined') {
      return !!sessionStorage.token;
    }
    return false;
  },

  // Remove token
  removeToken() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('token');
    }
  },

  // Check token
  /*checkToken(nextState, replace, callback) {
    Api.get('client').then((res) => {
      if (res != null && res !== '' && res.success) {
        return callback(true)
      } else {
        sessionStorage.removeItem('token')
        replace({
          pathname: '/'
        })
        callback(false)
      }
    })
  }*/
};
