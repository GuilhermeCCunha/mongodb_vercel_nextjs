import {  ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb"

export default async function handler(request, response) {
    if (request.method === "PUT") {
        const {Id} = request.query;
        // const data = request.body;
        const mongoClient = await clientPromise;
        const db = mongoClient.db("loja_carros");
        const yourCollection = db.collection("carros");
        try {
            const { nome, cor, ano } = request.body;
            if (!nome && !cor && !ano) return "inavalid data";
            const result = await yourCollection.replaceOne({ _id: new ObjectId(Id) }, {nome, cor, ano });
            response.status(200).json({ success: true , result });
          } catch (error) {
            console.log(error);
            response.status(500).json({ success: false, error });
          }

    }

}
