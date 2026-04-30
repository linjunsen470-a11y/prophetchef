import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would send an email or save to a database here.
    console.log("New Inquiry Received:", body);

    return NextResponse.json({ 
      success: true, 
      message: "Inquiry received successfully. Our team will contact you soon." 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Failed to process inquiry. Please try again later." 
    }, { status: 500 });
  }
}
