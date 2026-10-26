import api from "../../lib/api";
import { User } from "../users/user.entity";

export const authRepository = {
  async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const result = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    // 分割代入
    const { user, token } = result.data;
    return { user: new User(user), token };
  },
};
