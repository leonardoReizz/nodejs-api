import bcrypt from "bcryptjs";

export function generateHashedPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        reject(error);
      } else {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}
