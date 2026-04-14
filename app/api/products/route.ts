import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

const PRODUCTS_KEY = 'stichbros:custom_products';

export async function GET() {
  try {
    const products = await redis.lrange(PRODUCTS_KEY, 0, -1);
    return NextResponse.json(products || []);
  } catch (e) {
    console.error('Redis GET error:', e);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    await redis.lpush(PRODUCTS_KEY, JSON.stringify(product));
    return NextResponse.json({ success: true, id: product.id });
  } catch (e) {
    console.error('Redis POST error:', e);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}
