import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';

//FOR MORE INFO: https://jsonplaceholder.typicode.com/guide/
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL'); //'https://jsonplaceholder.typicode.com';

export interface IClient {
  getPosts(): Observable<Post[]>;
  getComments(): Observable<Comment[]>;
  getUsers(): Observable<User[]>;

  posts$: Observable<Post[]>;
  comments$: Observable<Comment[]>;
  users$: Observable<User[]>;
}

@Injectable()
export class Client implements IClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  public posts$: Observable<Post[]>;
  public comments$: Observable<Comment[]>;
  users$: Observable<User[]>;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : '/junctiondealservices';

    this.posts$ = this.getPosts();
    this.comments$ = this.getComments();
    this.users$ = this.getUsers();
  }

  /*
   * @return Success
   */
  getPosts(): Observable<Post[]> {
    let url_ = this.baseUrl + '/posts';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      body: '',
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetPosts(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetPosts(<any>response_);
            } catch (e) {
              // return <Observable<Post[]>>(<any>_observableThrow(e));
              throw new Error('something went wrong.');
            }
          } else throw new Error('something went wrong.'); //return <Observable<Post[]>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetPosts(response: HttpResponseBase): Observable<Post[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = [] as Post[]; //GetDealsResponse.fromJS(resultData200);

          if (Array.isArray(resultData200)) {
            // this.services = [] as any;
            for (let item of resultData200) result200!.push(item);
          }

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return new Observable<Post[]>();
  }

  getComments(): Observable<Comment[]> {
    let url_ = this.baseUrl + '/comments';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      body: '',
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetComments(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetComments(<any>response_);
            } catch (e) {
              // return <Observable<Post[]>>(<any>_observableThrow(e));
              throw new Error('something went wrong.');
            }
          } else throw new Error('something went wrong.'); //return <Observable<Post[]>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetComments(
    response: HttpResponseBase
  ): Observable<Comment[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = [] as Comment[]; //GetDealsResponse.fromJS(resultData200);

          if (Array.isArray(resultData200)) {
            // this.services = [] as any;
            for (let item of resultData200) result200!.push(item);
          }

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return new Observable<Comment[]>();
  }

  getUsers(): Observable<User[]> {
    let url_ = this.baseUrl + '/users';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      body: '',
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetUsers(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetComments(<any>response_);
            } catch (e) {
              // return <Observable<Post[]>>(<any>_observableThrow(e));
              throw new Error('something went wrong.');
            }
          } else throw new Error('something went wrong.'); //return <Observable<Post[]>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processGetUsers(response: HttpResponseBase): Observable<User[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = [] as User[]; //GetDealsResponse.fromJS(resultData200);

          if (Array.isArray(resultData200)) {
            // this.services = [] as any;
            for (let item of resultData200) result200!.push(item);
          }

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return new Observable<User[]>();
  }
}

// POSTS
export interface IPost {
  userId?: number | undefined;
  id?: number | undefined;
  title?: string | undefined;
  email?: string | undefined;
  body?: string | undefined;
  comments?: Comment[] | undefined;
}

export class Post implements IPost {
  userId?: number | undefined;
  id?: number | undefined;
  title?: string | undefined;
  email?: string | undefined;
  body?: string | undefined;
  comments?: Comment[] | undefined;

  constructor(data?: IPost) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.userId = _data['userId'];
      this.id = _data['id'];
      this.title = _data['title'];
      this.email = _data['email'];
      this.body = _data['body'];
    }
  }

  static fromJS(data: any): Post {
    data = typeof data === 'object' ? data : {};
    let result = new Post();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['userId'] = this.userId;
    data['id'] = this.id;
    data['title'] = this.title;
    data['email'] = this.email;
    data['body'] = this.body;
    return data;
  }
}

// COMMENTS:
export interface IComment {
  postId?: number | undefined;
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  body?: string | undefined;
}

export class Comment implements IComment {
  postId?: number | undefined;
  id?: number | undefined;
  name?: string | undefined;
  email?: string | undefined;
  body?: string | undefined;

  constructor(data?: IComment) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.postId = _data['postId'];
      this.id = _data['id'];
      this.name = _data['name'];
      this.email = _data['email'];
      this.body = _data['body'];
    }
  }

  static fromJS(data: any): Comment {
    data = typeof data === 'object' ? data : {};
    let result = new Post();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['postId'] = this.postId;
    data['id'] = this.id;
    data['name'] = this.name;
    data['email'] = this.email;
    data['body'] = this.body;
    return data;
  }
}

//USERS
// COMMENTS:
export interface IUser {
  id?: number | undefined;
  name?: string | undefined;
  username?: string | undefined;
}

export class User implements IUser {
  id?: number | undefined;
  name?: string | undefined;
  username?: string | undefined;

  constructor(data?: IUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.name = _data['name'];
      this.username = _data['username'];
    }
  }

  static fromJS(data: any): User {
    data = typeof data === 'object' ? data : {};
    let result = new Post();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    data['username'] = this.username;

    return data;
  }
}

// COMMON CLASSES:

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null)
    );
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
