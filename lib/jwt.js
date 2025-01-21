import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const MONTH = 31 * 24 * 60 * 60;

export class JWT {
  static async sign(data) {
    const iat = Math.floor(Date.now() / 1_000);

    const payload = { iat, data };

    const options = { expiresIn: MONTH };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET, options, (error, token) =>
        error
          ? reject(error)
          : token
          ? resolve(token)
          : reject(new Error("Undefined token."))
      );
    });
  }

  static async verify(token) {
    return new Promise((resolve) => {
      jwt.verify(token, SECRET, (error) =>
        error ? resolve(false) : resolve(true)
      );
    });
  }

  static decode(token) {
    return jwt.decode(token);
  }
}
