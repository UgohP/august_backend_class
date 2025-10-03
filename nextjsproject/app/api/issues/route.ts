import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error, {status: 401})
    }

    const newIssue = await prisma.issueTracker.create({
        data : {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 201})
}