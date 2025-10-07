import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const issueId = parseInt(params.id);

    if (isNaN(issueId)) {
      return NextResponse.json({ error: "Invalid Issue ID" }, { status: 400 });
    }
    const issue = await prisma.issueTracker.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
