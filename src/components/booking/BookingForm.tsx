"use client";

import { useState } from "react";
import { format } from "date-fns";
import { BookingCalendar } from "./Calendar";

export function BookingSection() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDate) return;

        setIsSubmitting(true);
        setSubmitStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            eventType: formData.get("eventType"),
            notes: formData.get("notes"),
            date: format(selectedDate, "yyyy-MM-dd"), // Only send the date part
        };

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSubmitStatus("success");
            } else {
                setSubmitStatus("error");
            }
        } catch (err) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="book" className="py-24 bg-dark-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Reserve Your <span className="text-gold-gradient">Date</span>
                    </h2>
                    <div className="section-divider" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Select an available date on the calendar, fill in your details, and submit a reservation request. Our team will review and lock your date.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                    {/* Step 1: Calendar */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 text-dark-900 text-sm">1</span>
                            Choose Date
                        </h3>
                        <BookingCalendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                    </div>

                    {/* Step 2: Form */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 text-dark-900 text-sm">2</span>
                            Your Details
                        </h3>

                        <div className="bg-dark-800 p-8 rounded-2xl glass-card border border-dark-600 shadow-xl">
                            {submitStatus === "success" ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
                                    <p className="text-gray-400">
                                        Your request for {selectedDate && format(selectedDate, "MMMM do, yyyy")} has been sent to the administration. It is now marked as PENDING.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitStatus("idle");
                                            setSelectedDate(null);
                                            // Force a page reload to pull fresh data or just let user navigate
                                            window.location.reload();
                                        }}
                                        className="mt-6 px-6 py-2 bg-dark-600 text-white rounded hover:bg-dark-500 transition-colors"
                                    >
                                        Book Another Date
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Selected Date</label>
                                        <div className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-md text-gold-400 font-bold">
                                            {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Please select a date from the calendar =>"}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Full Name</label>
                                        <input required type="text" id="name" name="name" disabled={!selectedDate || isSubmitting} className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:border-gold-500 transition-colors text-white disabled:opacity-50" placeholder="John Doe" />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">Phone Number</label>
                                        <input required type="tel" id="phone" name="phone" disabled={!selectedDate || isSubmitting} className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:border-gold-500 transition-colors text-white disabled:opacity-50" placeholder="+91 98765 43210" />
                                    </div>

                                    <div>
                                        <label htmlFor="eventType" className="block text-sm text-gray-400 mb-1">Event Type</label>
                                        <select required id="eventType" name="eventType" disabled={!selectedDate || isSubmitting} className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:border-gold-500 transition-colors text-white disabled:opacity-50">
                                            <option value="">Select Event Type</option>
                                            <option value="Wedding">Wedding</option>
                                            <option value="Reception">Reception</option>
                                            <option value="Engagement">Engagement</option>
                                            <option value="Corporate Event">Corporate Event</option>
                                            <option value="Other">Other Celebration</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm text-gray-400 mb-1">Additional Requirements (Optional)</label>
                                        <textarea id="notes" name="notes" rows={3} disabled={!selectedDate || isSubmitting} className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:border-gold-500 transition-colors text-white disabled:opacity-50" placeholder="E.g., Catering preferences, guest count..." />
                                    </div>

                                    {submitStatus === "error" && (
                                        <div className="p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                                            Failed to submit booking. The date might have just been taken. Please refresh and try again.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={!selectedDate || isSubmitting}
                                        className="w-full py-4 bg-gold-500 text-dark-900 font-bold tracking-widest uppercase rounded-md hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            "Submit Booking Request"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
