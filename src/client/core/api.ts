import * as fetch from 'isomorphic-fetch';
import Auth from './auth';

const API_URL = 'http://localhost:3000/api/';

const isWindow = typeof window !== 'undefined';

if (typeof btoa === 'undefined') {
  (global as any).btoa = (str: string) => {
    return new Buffer(str).toString('base64');
  };
}

interface IImage {
  w: number | null;
  h: number | null;
  path: string;
  img: string | null;
  watermark: boolean | null;
}

export default {
  // @todo logout if unauthorized
  checkStatus(response: any) {
    return response;
    /*if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401 || response.status === 403) {
      return response;
    } else {*/
    /*var error = new Error(response.statusText)
      error.response = response
      // throw error*
      return response;
    }*/
  },

  // Parse to json
  parseJSON(response: any) {
    return response.json();
  },

  async call(url: string, data: any = {}, method: any) {
    let token: string | null = null;
    let currentUrl: string = url;

    if (isWindow) {
      token = JSON.stringify(Auth.getToken());
    }

    const headers: any = {
      method: method.toUpperCase(),
      credentials: 'same-origin', // 'include',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        // 'fake-auth': btoa(JSON.stringify({ user: 'test', pass: 'somePassw0rd' })),
      },
    };

    if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'DELETE') {
      headers.body = JSON.stringify(data);
    } else {
      if (data != null) {
        if (Object.keys(data).length > 0) {
          currentUrl += `?${this.objToQuery(data)}`;
        }
      }
    }

    try {
      return await fetch(API_URL + currentUrl, headers)
        .then(this.checkStatus)
        .then(this.parseJSON);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  get(url: string, data?: any) {
    return this.call(url, data, 'GET');
  },

  // POST method
  post(url: string, data: any) {
    return this.call(url, data, 'POST');
  },

  // PUT method
  put(url: string, data: any) {
    return this.call(url, data, 'PUT');
  },

  // DELETE method
  delete(url: string, data?: any) {
    return this.call(url, data, 'DELETE');
  },

  alias(str: string) {
    return str
      .replace(/[^a-zA-Z ]/g, '')
      .toLocaleLowerCase()
      .replace(/\s+/g, '-');
  },

  makeQuery(data: any) {
    return this.objToQuery(data);
  },

  objToQuery(data: any, without: any | any[] = null) {
    const array = [];

    for (const i in data) {
      if (!without || i !== without) {
        if (Array.isArray(data[i])) {
          if (data[i].length > 0) {
            const listData = data[i].join(',');
            array.push(`${i}=${listData}`);
          }
        } else if (data[i] && data[i] !== null && data[i] !== '') {
          array.push(`${i}=${data[i]}`);
        }
      }
    }

    return array.join('&');
  },

  /**
   * Make query string to object
   *
   * @param string query
   * @param string without // query param name
   * @return Object
   */
  queryToObj(query: string, without: any = null) {
    if (query.trim() === '') {
      return null;
    }

    const obj = query.replace('?', '').split('&');
    const objectKeyVal: any = {};

    if (obj.length > 0) {
      obj.map((val: any) => {
        const arr = val.split('=');
        if (arr.length === 2) {
          if (!without || without !== arr[0]) {
            objectKeyVal[arr[0]] = arr[1];
          }
        }
      });
    }

    return objectKeyVal;
  },

  removeFromQuery(query: any, name: string | null = null) {
    const obj = this.queryToObj(query, name);

    return this.objToQuery(obj);
  },

  getParameterByName(name: string, url: string) {
    let newUrl = url;
    let newName = name;

    if (!isWindow) {
      return '';
    }

    if (isWindow && newUrl.trim() === '') {
      newUrl = window.location.href;
    }

    newName = newName.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${newName}(=([^&#]*)|&|#|$)`);
    const results: any = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  // Get image
  image(data: IImage | null = { w: null, h: null, path: '', img: null, watermark: null }) {
    if (data == null || typeof data !== 'object' || data.img == null || data.img === '') {
      return '';
    }

    const path = btoa(`?path=${data.path}&w=${data.w}&h=${data.h}&img=${data.img}${data.watermark === true ? '&watermark=1' : ''}`);

    return `${API_URL}images/${path}`;
  },

  encode(str: string) {
    return btoa(str);
  },

  decode(str: string) {
    return JSON.parse(atob(str));
  },
};
