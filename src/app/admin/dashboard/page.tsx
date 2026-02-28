"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

type Booking = {
    id: string;
    name: string;
    phone: string;
    eventType: string;
    date: string;
    status: "PENDING" | "BOOKED" | "REJECTED";
    notes: string | null;
    createdAt: string;
};

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        } else if (status === "authenticated") {
            fetchBookings();
        }
    }, [status, router]);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings");
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: "BOOKED" | "REJECTED") => {
        setIsActionLoading(id);
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                await fetchBookings();
            } else {
                alert("Failed to update status. Check permissions.");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating status.");
        } finally {
            setIsActionLoading(null);
        }
    };

    // Prevent flash of content
    if (status === "loading" || status === "unauthenticated") {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-900 text-white">
            {/* Top Bar */}
            <header className="bg-dark-800 border-b border-dark-600 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold font-display text-gold-gradient">Admin Dashboard</h1>
                        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                            Live
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Welcome, {session?.user?.name || "Admin"}</span>
                        <button
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                            className="text-sm uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Booking Requests</h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Review and manage all incoming reservations for the Function Hall.
                        </p>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="bg-dark-800 border border-dark-600 rounded-lg shadow-xl overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-400">Loading records...</div>
                    ) : bookings.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">No booking requests found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-dark-600">
                                <thead className="bg-dark-900">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date Requested</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Client Details</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Event Info</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-600 bg-dark-800">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-dark-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-white">{format(new Date(booking.date), "MMM d, yyyy")}</div>
                                                <div className="text-xs text-gray-500">{format(new Date(booking.date), "EEEE")}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-white">{booking.name}</div>
                                                <div className="text-sm text-gold-400">{booking.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-white">{booking.eventType}</div>
                                                {booking.notes && (
                                                    <div className="text-xs text-gray-400 mt-1 max-w-xs truncate" title={booking.notes}>
                                                        Note: {booking.notes}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${booking.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                                        booking.status === "BOOKED" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                            "bg-red-500/10 text-red-500 border-red-500/20"
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {booking.status === "PENDING" && (
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            disabled={isActionLoading === booking.id}
                                                            onClick={() => handleStatusChange(booking.id, "BOOKED")}
                                                            className="text-green-500 hover:text-green-400 disabled:opacity-50"
                                                        >
                                                            Approve
                                                        </button>
                                                        <span className="text-dark-600">|</span>
                                                        <button
                                                            disabled={isActionLoading === booking.id}
                                                            onClick={() => handleStatusChange(booking.id, "REJECTED")}
                                                            className="text-red-500 hover:text-red-400 disabled:opacity-50"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                                {/* If Booked, allow Un-booking to free it up or reject */}
                                                {booking.status === "BOOKED" && (
                                                    <button
                                                        disabled={isActionLoading === booking.id}
                                                        onClick={() => handleStatusChange(booking.id, "REJECTED")}
                                                        className="text-red-500 hover:text-red-400 text-xs uppercase disabled:opacity-50"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
