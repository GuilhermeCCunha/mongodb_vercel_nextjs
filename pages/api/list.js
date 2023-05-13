// import { connectToDatabase } from "../../lib/connectToDatabase";
import clientPromise from "../../lib/mongodb"

export default async function handler(request, response){
    try {
        // const { mongoClient } = await connectToDatabase();
        const mongoClient = await clientPromise;
        const db = mongoClient.db("loja_carros");
        const collection = db.collection("carros");
        const results = await collection
          .find({})
          .project({
            grades: 0,
            borough: 0,
            carro_id: 0,
          })
          .limit(10)
          .toArray();

        response.status(200).json(results);  
    } catch (e) {
      console.error(e);
      response.status(500).json(e);  
    }
}