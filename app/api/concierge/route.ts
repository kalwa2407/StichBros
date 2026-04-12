import { NextResponse } from "next/server";

type ConciergeBody = {
  name?: string;
  email?: string;
  service?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ConciergeBody;

  if (!body.name || !body.email || !body.service) {
    return NextResponse.json(
      { error: "Name, email, and service are required." },
      { status: 400 },
    );
  }

  const reference = `CMW-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return NextResponse.json({
    message: `Thanks ${body.name}. Your ${body.service.toLowerCase()} request is confirmed under ${reference}. Our team will contact you within 24 hours.`,
  });
}
