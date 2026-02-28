import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/admin/lock-date - Manually mark a date as Booked or unbook it
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { date, action, notes } = await request.json();
        // action can be 'LOCK' or 'UNLOCK'

        if (action === 'UNLOCK') {
            // Just delete or mark as rejected to free it up
            await prisma.booking.deleteMany({
                where: { date: new Date(date) },
            });
            return NextResponse.json({ success: true, message: 'Date unlocked' });
        }

        if (action === 'LOCK') {
            const booking = await prisma.booking.upsert({
                where: { date: new Date(date) },
                update: {
                    status: 'BOOKED',
                    notes: notes || 'Manually locked by Admin',
                },
                create: {
                    name: 'ADMIN LOCK',
                    phone: '-',
                    eventType: 'LOCKED',
                    date: new Date(date),
                    status: 'BOOKED',
                    notes: notes || 'Manually locked by Admin',
                },
            });
            return NextResponse.json({ success: true, booking });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error locking date:', error);
        return NextResponse.json({ error: 'Failed to process manual lock' }, { status: 500 });
    }
}
