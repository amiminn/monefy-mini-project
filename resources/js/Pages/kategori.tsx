import AlertYell from "@/components/Alert";
import RandomBg from "@/components/RandomBg";
import axiosInstance from "@/lib/axios-lib";
import { alertError, alertSuccess } from "@/lib/sweetalert-lib";
import { Head, Link } from "@inertiajs/react";
import { Home, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function KategoriPage() {
    const [listDataKategory, setListDataKategory] = useLocalStorage<
        KategoriType[]
    >("DATAKATEGORI", []);

    const [jenisKategori, setJenisKategori] = useState<
        "PENDAPATAN" | "PENGELUARAN"
    >("PENDAPATAN");
    const [namaKategori, setNamaKategori] = useState<string>("");

    async function submitDataKategori(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            jenis_kategori: jenisKategori,
            nama_kategori: namaKategori,
        };

        try {
            const res = await axiosInstance.post("/api/kategori", data);
            getDataKategori();
            setNamaKategori("");
            alertSuccess(res.data.message);
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    async function getDataKategori() {
        try {
            const { data } = await axiosInstance.get("/api/kategori");
            setListDataKategory(data.data);
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    async function deleteDataKategori(id: number) {
        try {
            const res = await axiosInstance.delete(`/api/kategori/${id}`);
            getDataKategori();
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    useEffect(() => {
        getDataKategori();
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-white">
            <RandomBg />
            <RandomBg />
            <Link
                href="/"
                className="fixed z-[9999] flex items-center justify-center w-12 h-12 text-xl text-white transition rounded-full shadow-lg bg-slate-500 top-4 right-4 hover:bg-slate-700"
            >
                <Home />
            </Link>

            <Head title="Kategori Settings" />
            <div className="container max-w-[500px] grid items-center justify-center grid-cols-1 gap-5 p-4 mx-auto">
                <section className="z-50 gap-3 p-4 font-mono bg-white border-2 border-dashed rounded-lg border-sky-200">
                    <AlertYell text={`Tambah Data Kategori`} />
                    <form
                        onSubmit={submitDataKategori}
                        className="flex flex-col items-center gap-4 mt-5"
                    >
                        <div className="relative z-0 w-full mb-5">
                            <select
                                name="select"
                                defaultValue=" "
                                onClick={(e) =>
                                    e.currentTarget.setAttribute(
                                        "value",
                                        e.currentTarget.value
                                    )
                                }
                                onChange={(e) =>
                                    setJenisKategori(
                                        e.currentTarget.value as
                                            | "PENDAPATAN"
                                            | "PENGELUARAN"
                                    )
                                }
                                className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none border-sky-200 z-1 focus:outline-none focus:ring-0 focus:border-sky-200"
                            >
                                <option value="PENDAPATAN">PENDAPATAN</option>
                                <option value="PENGELUARAN">PENGELUARAN</option>
                            </select>
                            <label
                                htmlFor="select"
                                className="absolute text-gray-500 duration-300 top-3 -z-1 origin-0"
                            >
                                Pilih Kategori
                            </label>
                            <span
                                className="hidden text-sm text-red-600"
                                id="error"
                            >
                                Option has to be selected
                            </span>
                        </div>
                        <div className="relative z-0 w-full mb-5">
                            <input
                                type="text"
                                name="nama_kategori"
                                placeholder=" "
                                required
                                value={namaKategori}
                                onChange={(e) =>
                                    setNamaKategori(e.currentTarget.value)
                                }
                                className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none border-sky-200 focus:outline-none focus:ring-0 focus:border-sky-200"
                            />
                            <label
                                htmlFor="nama_kategori"
                                className="absolute text-gray-500 duration-300 top-3 -z-1 origin-0"
                            >
                                Nama Kategori
                            </label>
                            <span
                                className="hidden text-sm text-red-600"
                                id="error"
                            >
                                Amount is required
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-2 mt-1 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none cursor-pointer bg-sky-400 hover:bg-sky-600 hover:shadow-lg focus:outline-none"
                        >
                            Tambah Kategori
                        </button>
                    </form>
                </section>
                <section className="z-50 gap-3 p-4 font-mono bg-white border-2 border-dashed rounded-lg border-sky-200">
                    <AlertYell
                        text={`Menghapus data kategori akan menghapus data keuangan yang terhubung.`}
                    />
                    <div className="flex flex-col items-center gap-4 mt-5 max-h-[250px] overflow-y-auto">
                        {listDataKategory.map((item: KategoriType) => {
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between w-full p-2 "
                                >
                                    <div className="flex flex-col">
                                        {item.jenis_kategori ===
                                        "PENGELUARAN" ? (
                                            <span className="text-sm font-bold text-red-500">
                                                {item.jenis_kategori}
                                            </span>
                                        ) : (
                                            <span className="text-sm font-bold text-green-500">
                                                {item.jenis_kategori}
                                            </span>
                                        )}
                                        <span className="text-lg font-bold text-slate-700">
                                            {item.nama_kategori}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            deleteDataKategori(item.id)
                                        }
                                        className="flex items-center justify-center w-10 h-10 transition duration-200 rounded text-slate-500 hover:bg-slate-500 hover:text-white"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

interface KategoriType {
    id: 1;
    jenis_kategori: "PENGELUARAN" | "PENDAPATAN";
    nama_kategori: string;
}
