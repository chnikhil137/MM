import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const playfair = Playfair_Display({
    variable: '--font-playfair',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'MM Function Hall — Premium Events & Celebrations',
    description:
        'The most prestigious Function Hall for weddings, receptions, corporate events, and celebrations. Book your dream event today.',
    keywords: 'function hall, wedding venue, event hall, reception venue, banquet hall',
    openGraph: {
        title: 'MM Function Hall — Premium Events & Celebrations',
        description: 'The most prestigious Function Hall for weddings, receptions, and celebrations.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-dark-900 text-white antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
