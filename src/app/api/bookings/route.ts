import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/bookings - Fetch all bookings (Admin only)
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { date: 'asc' },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

// POST /api/bookings - Submit a new booking request (Public)
export async function POST(request: Request) {
    try {
        const { name, phone, eventType, date, notes } = await request.json();

        // Prevent booking a date that is already PENDING or BOOKED
        const existing = await prisma.booking.findUnique({
            where: { date: new Date(date) },
        });

        if (existing && existing.status !== 'REJECTED') {
            return NextResponse.json(
                { error: 'Date is no longer available.' },
                { status: 400 }
            );
        }

        const booking = await prisma.booking.upsert({
            where: { date: new Date(date) },
            update: {
                name,
                phone,
                eventType,
                notes,
                status: 'PENDING',
            },
            create: {
                name,
                phone,
                eventType,
                date: new Date(date),
                notes,
                status: 'PENDING',
            },
        });

        return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking request' }, { status: 500 });
    }
}
