import axios from 'axios';
import Auth from './auth';

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

export default class Api {
  private static baseUrl = 'http://localhost:3000/api/';

  public static get(url: string) {
    return this.call(url, 'GET');
  }

  public static post(url: string, data: any) {
    return this.call(url, 'POST', data);
  }

  // PUT method
  public static put(url: string, data: any) {
    return this.call(url, 'PUT', data);
  }

  public static delete(url: string, data?: any) {
    return this.call(url, 'DELETE', data);
  }

  public static alias(str: string) {
    return str
      .replace(/[^a-zA-Z ]/g, '')
      .toLocaleLowerCase()
      .replace(/\s+/g, '-');
  }

  /**
   * Make query string from object
   */
  public static makeQuery(data: any) {
    return this.objToQuery(data);
  }

  /**
   * Make query string from object
   */
  public static objToQuery(data: any, without: any | any[] = null) {
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
  }

  /**
   * Make query string to object
   */
  public static queryToObj(query: string, without: any = null) {
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
  }

  /**
   * Remove passed param(name) from query string
   */
  public static removeFromQuery(query: any, name: string | null = null) {
    const obj = this.queryToObj(query, name);

    return this.objToQuery(obj);
  }

  /**
   * Get parameter from query string
   */
  public static getParameterByName(name: string, url: string) {
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
  }

  /**
   * Get image url
   */
  public static image(data: IImage | null = { w: null, h: null, path: '', img: null, watermark: null }) {
    if (data == null || typeof data !== 'object' || data.img == null || data.img === '') {
      return '';
    }

    const path = btoa(
      `?path=${data.path}&w=${data.w}&h=${data.h}&img=${data.img}${data.watermark === true ? '&watermark=1' : ''}`,
    );

    return `${this.baseUrl}images/${path}`;
  }

  /**
   * Encode string
   */
  public static encode(str: string) {
    return btoa(str);
  }

  /**
   * Decode string
   */
  public static decode(str: string) {
    return JSON.parse(atob(str));
  }

  /**
   * Check response status
   * @todo errors & auth (401-403)
   */
  private static checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

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
  }

  /**
   * Call to api server
   */
  private static call(url: string, method: string, data?: any) {
    let AUTH_TOKEN: string | null = null;

    if (isWindow) {
      AUTH_TOKEN = JSON.stringify(Auth.getToken());
    }

    axios.defaults.baseURL = this.baseUrl;
    axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;

    try {
      return axios({
        method,
        url,
        data,
        withCredentials: false,
      }).then(this.checkStatus);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
