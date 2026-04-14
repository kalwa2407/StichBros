import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

const ORDERS_KEY = 'stichbros:orders';

export async function GET() {
  try {
    const orders = await redis.lrange(ORDERS_KEY, 0, -1);
    return NextResponse.json(orders || []);
  } catch (e) {
    console.error('Redis GET error:', e);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();
    // Push to front of list (newest first)
    await redis.lpush(ORDERS_KEY, JSON.stringify(order));
    return NextResponse.json({ success: true, id: order.id });
  } catch (e) {
    console.error('Redis POST error:', e);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}
