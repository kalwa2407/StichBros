import { NextResponse } from "next/server";

import { getHomepageData } from "@/lib/catalog";

export async function GET() {
  const data = getHomepageData();

  return NextResponse.json({
    collections: data.collections,
    products: data.products,
    updatedAt: new Date().toISOString(),
  });
}
