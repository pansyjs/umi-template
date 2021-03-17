/* eslint-disable spaced-comment */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./users/api.d.ts" />

declare namespace API {
  /** 后端的返回的数据结果 */
  interface Result<T = any> {
    data: T;
    code: number;
    message: string;
  }
}
