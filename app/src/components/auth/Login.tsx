import axios from "axios";
import React, { useState } from "react";

export default function Registration(props: {
  handleSuccessfulAuthentication: Function;
}) {
  const { handleSuccessfulAuthentication } = props;
  // 初期値を定義
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Railsにデータを渡す
    axios
      .post(
        "http://localhost:3000/api/v1/login",
        {
          // ユーザオブジェクト
          user: {
            email: email,
            password: password,
          },
        },
        // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.logged_in) {
          handleSuccessfulAuthentication(res.data);
        }
      })
      .catch((err) => {
        console.log("resistration err", err);
      });

    event.preventDefault();
  };

  return (
    <div>
      <p>ログイン</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
