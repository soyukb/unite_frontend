import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // `credentials`で定義した`username`、`password`が入っています。
        // ここにロジックを追加して、資格情報からユーザーを検索します。
        // 本来はバックエンドから認証情報を取得するイメージですが、ここでは定数を返しています。
        // const user = await authenticationLogic(credentials?.username, credentials?.password);
        const res = await axios.post(
          "http://localhost:8000/api/token/",
          credentials,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          role: "admin",
          access: res.data.access,
          refresh: res.data.refresh,
        };

        if (user) {
          // 返されたオブジェクトはすべて、JWT の「user」プロパティに保存されます。
          return user;
        } else {
          // 認証失敗の場合はnullを返却します。
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // `jwt()`コールバックは`authorize()`の後に実行されます。
    // `user`に追加したプロパティ`role`と`backendToken`を`token`に設定します。
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.backendToken = user.backendToken;
      }
      return token;
    },
    // `session()`コールバックは`jwt()`の後に実行されます。
    // `token`に追加したプロパティ`role`と`backendToken`を`session`に設定します。
    session({ session, token }) {
      session.user.role = token.role;
      session.user.backendToken = token.backendToken;
      return session;
    },
  },
});
