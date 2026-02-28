import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-dark-900 border-t border-dark-600 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-xl font-display font-bold text-gold-gradient mb-4">
                        {process.env.NEXT_PUBLIC_HALL_NAME || "MM FUNCTION HALL"}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        The premier destination for your most treasured celebrations,
                        setting the standard for luxury and elegance.
                    </p>
                </div>
                <div>
                    <h4 className="text-white uppercase tracking-widest text-sm mb-4">Contact Info</h4>
                    <p className="text-gray-400 text-sm mb-2">
                        Phone: {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                        Address: {process.env.NEXT_PUBLIC_HALL_ADDRESS}
                    </p>
                </div>
                <div>
                    <h4 className="text-white uppercase tracking-widest text-sm mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="#book" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">Book Date</Link></li>
                        <li><Link href="#gallery" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">Gallery</Link></li>
                        <li><Link href="/admin/login" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">Admin Portal</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-dark-600 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_HALL_NAME}. All rights reserved.
            </div>
        </footer>
    );
}
