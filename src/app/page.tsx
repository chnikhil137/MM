import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { BookingSection } from "@/components/booking/BookingForm";
import { Location } from "@/components/sections/Location";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Gallery />
            <Location />
            <BookingSection />
            <Footer />
            <FloatingContact />
        </main>
    );
}
