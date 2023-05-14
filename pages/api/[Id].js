import {  ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb"

export default async function handler(request, response){
    
    const {Id} = request.query
    if(request.method !== 'DELETE') return
    
    const mongoClient = await clientPromise;
    const db = mongoClient.db("loja_carros");
    const yourCollection = db.collection("carros");
    const result = await (await yourCollection.deleteOne({_id: new ObjectId(Id)})).deletedCount;
    console.log(`deleted count::::${result}`)
    return response.json({
        carro: result,
        message: `carro _id: ${Id} deleted`
    })
}
