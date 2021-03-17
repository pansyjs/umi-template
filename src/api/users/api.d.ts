declare namespace API {
  namespace User {
    interface LoginParams {
      username: string;
      password: string;
    }

    interface LoginResult {
      token: string;
    }

    interface Current {
      name: string;
      age: number;
    }
  }
}
