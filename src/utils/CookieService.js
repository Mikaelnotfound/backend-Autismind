"use strict";

class CookieService {
  static set(res, name, value) {
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: 'None',
      maxAge: 3600000,
    };

    res.cookie(name, value, options);
  }
}

module.exports = CookieService;
