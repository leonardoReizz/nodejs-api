export class MysqlException extends Error {
  constructor(message: string) {
    super(`Mysql exception ${message}`);
  }
}
