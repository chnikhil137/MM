import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// FIXED: robust date range lookup + recycling of REJECTED records + full error logging

export const dynamic = 'force-dynamic';

// GET /api/bookings - Fetch all bookings (Admin only)
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { date: 'asc' },
        });
        return NextResponse.json(bookings);
    } catch (error: any) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({
            error: 'Failed to fetch bookings',
            details: error.message,
            code: error.code
        }, { status: 500 });
    }
}

// POST /api/bookings - Submit a new booking request (Public)
export async function POST(request: Request) {
    try {
        const { name, phone, eventType, date, notes } = await request.json();

        // Normalize the incoming date string to midnight UTC
        const normalizedDate = new Date(`${date}T00:00:00Z`);

        // Use a date range (start of day to end of day) to avoid exact
        // millisecond mismatches with findUnique on DateTime fields
        const startOfDay = new Date(`${date}T00:00:00Z`);
        const endOfDay = new Date(`${date}T23:59:59Z`);

        // Prevent booking a date that is already PENDING or BOOKED
        const existing = await prisma.booking.findFirst({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        if (existing && existing.status !== 'REJECTED') {
            return NextResponse.json(
                { error: 'Date is no longer available.' },
                { status: 400 }
            );
        }

        let booking;

        if (existing && existing.status === 'REJECTED') {
            // Reuse the existing rejected record by updating it
            booking = await prisma.booking.update({
                where: { id: existing.id },
                data: {
                    name,
                    phone,
                    eventType,
                    notes,
                    status: 'PENDING',
                    date: normalizedDate,
                },
            });
        } else {
            // Create a fresh booking
            booking = await prisma.booking.create({
                data: {
                    name,
                    phone,
                    eventType,
                    date: normalizedDate,
                    notes,
                    status: 'PENDING',
                },
            });
        }

        return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking request' }, { status: 500 });
    }
}