export default class ApiException extends Error {
  isApiException: boolean; // instanceof is unreliable

  statusCode: number;

  data: any;

  constructor(message : string, statusCode : number = 400, data ?: any) {
    super(message);
    this.isApiException = true;
    this.name = 'Exception';
    this.statusCode = Math.max(400, Math.min(499, statusCode));
    this.data = data;
  }
}
