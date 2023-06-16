"use client";

import { FormEvent, useState } from "react";

export default function Form() {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMessage, setErrMessage] = useState("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = JSON.stringify({
      nickname,
      email,
      password,
    });

    try {
      const result = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      console.log(await result.json());
    } catch (err) {
      console.log(`error: ${err}`);
      return <div>エラーが発生しました。時間を置いて再度お試しください。</div>;
    }
    setNickname("");
    setEmail("");
    setPassword("");
  };

  if (errMessage) return <h2>{errMessage}</h2>;
  return (
    <div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label htmlFor="nickname">nickname:</label>
        <input
          type="text"
          id="nickname"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          required
        />
        <br />

        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />

        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />

        <button type="submit">送信</button>
      </form>
    </div>
  );
}
