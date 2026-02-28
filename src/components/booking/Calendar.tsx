"use client";

import { useState, useEffect } from "react";
import RealCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";

type Booking = {
    id: string;
    date: string;
    status: "PENDING" | "BOOKED" | "REJECTED";
};

type Props = {
    onDateSelect: (date: Date | null) => void;
    selectedDate: Date | null;
};

export function BookingCalendar({ onDateSelect, selectedDate }: Props) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/bookings")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBookings(data);
                }
                setLoading(false);
            });
    }, []);

    // Determine the tile class based on availability
    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view !== "month") return "";

        const booking = bookings.find((b) => isSameDay(new Date(b.date), date));

        if (!booking || booking.status === "REJECTED") {
            return "available-date";
        }
        if (booking.status === "PENDING") {
            return "pending-date";
        }
        if (booking.status === "BOOKED") {
            return "booked-date";
        }
        return "";
    };

    // Disable dates in the past or already booked/pending
    const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
        if (view !== "month") return false;

        // Disable past dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return true;

        // Disable if pending or booked
        const booking = bookings.find((b) => isSameDay(new Date(b.date), date));
        return booking?.status === "PENDING" || booking?.status === "BOOKED";
    };

    return (
        <div className="bg-dark-800 p-6 rounded-2xl glass-card border border-dark-600 shadow-xl w-full max-w-md mx-auto">
            <h3 className="text-xl font-display font-bold text-center text-white mb-6">Select a Date</h3>

            {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    <RealCalendar
                        onChange={(val) => onDateSelect(val as Date)}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        tileDisabled={tileDisabled}
                        minDate={new Date()}
                        className="custom-calendar"
                    />

                    <div className="mt-8 flex justify-center gap-6 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-dark-600 border border-dark-500" />
                            Available
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500" />
                            Pending
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500" />
                            Booked
                        </div>
                    </div>
                </>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-calendar {
          width: 100% !important;
          background: transparent !important;
          border: none !important;
          font-family: inherit !important;
          color: white !important;
        }
        .react-calendar__navigation button {
          color: white !important;
          min-width: 44px;
          background: none;
        }
        .react-calendar__navigation button:enabled:hover {
          background-color: rgba(212, 168, 48, 0.1) !important;
        }
        .react-calendar__month-view__weekdays {
          color: #d4a830;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
        .react-calendar__tile {
          padding: 0.75em 0.5em !important;
          color: #fff;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .react-calendar__tile:disabled {
          background-color: transparent !important;
          color: rgba(255, 255, 255, 0.2) !important;
          text-decoration: line-through;
        }
        .react-calendar__tile--now {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
          background-color: rgba(212, 168, 48, 0.2) !important;
        }
        .react-calendar__tile--active {
          background: #d4a830 !important;
          color: #000 !important;
          font-weight: bold;
        }
        /* Custom status classes */
        .pending-date {
          background-color: rgba(234, 179, 8, 0.15) !important;
          color: #facc15 !important;
          border: 1px solid rgba(234, 179, 8, 0.5) !important;
        }
        .booked-date {
          background-color: rgba(239, 68, 68, 0.15) !important;
          color: #f87171 !important;
          border: 1px solid rgba(239, 68, 68, 0.5) !important;
        }
      `}} />
        </div>
    );
}
