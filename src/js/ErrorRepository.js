export class ErrorRepository {
  constructor() {
    this.map = new Map([
      [200, 'OK'],
      [400, 'Bad Request'],
      [401, 'Unauthorized'],
      [403, 'Forbidden'],
      [404, 'Not Found'],
      [500, 'Internal Server Error'],
      [502, 'Bad Gateway'],
    ]);
  }

  translate(code) {
    if (!this.map.has(code)) {
      return 'Unknown error';
    }
    return this.map.get(code);
  }
}
