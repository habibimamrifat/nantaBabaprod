export interface ResponseTypeInterface<T = any> {
  success: boolean;
  statusCode: number;
  message: string | string[];
  data?: T;
  path?: string;
  timeStamp: string;
}
