import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PATCH /api/bookings/[id] - Approve or Reject a booking
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { status } = await request.json(); // "BOOKED" | "REJECTED"

        if (!['BOOKED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const booking = await prisma.booking.update({
            where: { id: params.id },
            data: { status },
        });

        return NextResponse.json({ success: true, booking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
