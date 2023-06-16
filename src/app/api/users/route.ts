import mysql from "mysql2/promise";
import fs from "fs";
import { promisify } from "util";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();

async function promisifyReadFile(fileURL: string) {
  const promisifyRead = promisify(fs.readFile).bind(fs);
  const data = await promisifyRead(fileURL, {
    encoding: "utf-8",
  });
  return data;
}

type FormData = {
  nickname: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  const req = await request.json();

  // TODO フォームデータのバリデーションチェック
  // if (!validateCheck(req)) return false;

  if (!process.env.DATABASE_URL) return false;

  const { nickname, email, password }: FormData = req;

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    const query =
      "INSERT INTO `users` (`nickname`, `email`, `password`) VALUES (?, ?, ?);";
    const statement = await connection.prepare(query);
    await statement.execute([nickname, email, password]);
    await statement.close();
    await connection.end();
    return NextResponse.json({ message: "正常終了" });
  } catch (err) {
    console.log(`err: ${err}`);
    // await connection.end();
    return NextResponse.json({ message: `{err: ${err}}` });
  }
}
