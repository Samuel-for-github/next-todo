import client from "@/lib/appwrite_client";
import { Databases} from "appwrite";
import { NextResponse } from "next/server";



const database = new Databases(client)


async function fetchDesc(id: string) {
    try {
        const desc = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Description", id)
        return desc;
    } catch (error) {
        console.log('error fetching desc', error);
        throw new Error('failed desc')
    }
}

async function deleteDesc(id: string) {
    try {
        const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Description", id)
        return response
    } catch (error) {
        console.log('error deleting desc', error);
        throw new Error('failed delete desc')
    }
}

async function updateDesc(id: string,data: {task: string, desc: string}) {
    try {
        const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "Description", id, data)
        return response
    } catch (error) {
        console.log('error deleting desc', error);
        throw new Error('failed delete desc')
    }
}


export async function GET(req: Request, {params}:{params:{id: string}}){
        try {
            const id = params.id;
            const desc = await fetchDesc(id);
            return NextResponse.json(desc)
        } catch (error) {
            return NextResponse.json({error: "Failed to fetch desc"}, {status: 500})
        }
}

export async function DELETE(req: Request, {params}:{params:{id: string}}){
    try {
        const id = params.id;
        await deleteDesc(id)
        return NextResponse.json({message: "deleted success"})
    } catch (error) {
        return NextResponse.json({error: "Failed to delete desc"}, {status: 500})
    }
}

export async function PUT(req: Request, {params}:{params:{id: string}}){
    try {
        const id = params.id;
        const data = await req.json()
        await updateDesc(id, data)
        return NextResponse.json({message: "edit success"})
    } catch (error) {
        return NextResponse.json({error: "Failed to update desc"}, {status: 500})
    }
}
