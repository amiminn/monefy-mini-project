import { Head, Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <>
            <Head title="404 Not Found" />
            <div className="relative flex flex-col items-center justify-center min-h-screen font-mono bg-gray-100">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-xl text-gray-600">
                    Halaman tidak ditemukan.
                </p>
                <Link href="/" className="mt-6 text-blue-600 hover:underline">
                    Kembali ke Beranda
                </Link>
            </div>
        </>
    );
}
