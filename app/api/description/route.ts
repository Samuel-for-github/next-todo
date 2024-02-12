import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client)

async function createDescription(data: {task: string, desc: string}){
    try {
        const response = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Description", ID.unique(), data)
        return response
    
    } catch (error) {
        console.log("Eror making ",error);
        throw new Error("Failed")
        
    }
}

async function fetchDescription(){
    try {
        const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Description", [Query.orderDesc("$createdAt")])
        return response.documents
    
    } catch (error) {
        console.log("Eror fetching ",error);
        throw new Error("Failed")
        
    }
}
export async function POST(req: Request) {
    try {
        const {task, desc} = await req.json()
        const data = {task, desc};
        const response = await createDescription(data)
        return NextResponse.json({message: "success"})
    } catch (error) {
        return NextResponse.json({error: "failed"})
    }
}
export async function GET(req: Request) {
    try {
       
        const desc = await fetchDescription()
        return NextResponse.json(desc)
    } catch (error) {
        return NextResponse.json({error: "failed"})
    }
}