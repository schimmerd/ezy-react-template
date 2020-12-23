import Cookies from "js-cookie";


class Auth {

  logout() {
    Cookies.remove("__session");
    window.location.reload();
  }

  getSession() {
    try {
      const __session = Cookies.get("__session");
      return JSON.parse(__session);
    } catch (e) {
      return false
    }
  }

  async setAuthenticated(auth, user, access_token, id_token, exp) {
    const session = {
      authenticated: auth,
      profile: user,
      exp: exp,
      access_token: access_token,
      id_token: id_token
    };
    Cookies.set("__session", JSON.stringify(session));
    window.location.reload()
  }

  isAuthenticated() {
    const session = Cookies.get("__session");
    if (!session) {
      return false;
    }
    return JSON.parse(session).authenticated;
  }
}

export default new Auth();