import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

const ORDERS_KEY = 'stichbros:orders';

export async function PATCH(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();
    const orders = await redis.lrange(ORDERS_KEY, 0, -1);

    // Find and update the order
    for (let i = 0; i < orders.length; i++) {
      const order = typeof orders[i] === 'string' ? JSON.parse(orders[i] as string) : orders[i];
      if (order.id === orderId) {
        order.status = status;
        await redis.lset(ORDERS_KEY, i, JSON.stringify(order));
        return NextResponse.json({ success: true });
      }
    }
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  } catch (e) {
    console.error('Redis PATCH error:', e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
