import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectToDB(): Promise<Db> {
  if (!client) {
    client = new MongoClient('mongodb+srv://IELTS:AmareCharaProjectKOironaOru1912!@cluster0.1nq4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('SpeakingTest'); 
  }
  return db;
}
