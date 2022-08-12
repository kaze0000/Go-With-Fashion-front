import axios from "axios";
import React, { useState } from "react";

export default function Registration(props: {
  handleSuccessfulAuthentication: Function;
}) {
  const { handleSuccessfulAuthentication } = props;
  // 初期値を定義
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/signup`,
        {
          // ユーザオブジェクト
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める
        { withCredentials: true }
      )
      .then((res) => {
        // 新規登録に成功したらcreatedというステータスが返ってくる
        console.log(res);
        if (res.data.status === "created") {
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
      <p>新規登録</p>
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />

        <button type="submit">登録</button>
      </form>
    </div>
  );
}
