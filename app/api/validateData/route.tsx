import { FileType } from "@/app/Hooks/FileProvider";
import { Collection, Db, MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ time: new Date().toISOString() }),
  //   })

  //   const data = await res.json()

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  require("dotenv").config();
  const data: FileType = await request.json();
  try {
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!);
    await client.connect();
    const db: Db = client.db(process.env.DB_NAME);
    const fileCollection: Collection = db.collection("data.csv");
    // const res = await fileCollection.insertOne(data);
    const res = await fileCollection.findOne({fileName: "data.csv"})
    // data.data = data.data.reverse();
    // const headers = data.data.pop();
    // data.data.splice(0, 0, headers);
    await timeout(500);
    

    return NextResponse.json({ body: JSON.stringify(res) }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ body: e}, { status: 400 });
  }
}
