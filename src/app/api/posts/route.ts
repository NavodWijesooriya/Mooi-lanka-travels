
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a server component, we need to use the container service name when running in Docker
    const baseUrl = typeof window === 'undefined' 
      ? 'http://web:3105' // Use container name for server-side requests
      : ''; // Use relative URL for client-side

    const res = await fetch(`${baseUrl}/api/blog-posts`, {
      cache: "no-store",
      headers: {
        'Accept': 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}