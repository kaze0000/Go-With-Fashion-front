import React from "react";

export default function Dashboard(props: { loggedInStatus: string }) {
  const { loggedInStatus } = props;
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {loggedInStatus}</h2>
    </div>
  );
}
