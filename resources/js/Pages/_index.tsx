import AlertYell from "@/components/Alert";
import GrowDown from "@/components/lottie/GrowDown";
import GrowUp from "@/components/lottie/GrowUp";
import PayChart from "@/components/PieChart";
import RandomBg from "@/components/RandomBg";
import { Head, Link } from "@inertiajs/react";
import { Settings, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import axiosInstance from "@/lib/axios-lib";
import { useLocalStorage } from "usehooks-ts";
import { motion } from "motion/react";
import { alertError, alertSuccess } from "@/lib/sweetalert-lib";

export default function HomePage() {
    const [jenisKeuangan, setJenisKeuangan] = useState<JenisKeuangan>(
        JenisKeuangan.PENDAPATAN
    );

    const [listKategori, setListKategori] = useState<KategoriType[]>([]);
    const [listKeuangan, setListKeuangan] = useLocalStorage<ListKeuanganType[]>(
        "DATAKEUANGAN",
        []
    );

    const [kategoriSelected, setKategoriSelected] = useState<number>(0);
    const [tanggal, setTanggal] = useState<string>("");
    const [jumlahNominal, setJumlahNominal] = useState<number>(0);

    const [saldo, setSaldo] = useState(0);
    const [totalPendapatan, setTotalPendapatan] = useState(0);
    const [totalPengeluaran, setTotalPengeluaran] = useState(0);

    const [chartDataPendapatan, setChartDataPendapatan] =
        useState<DataChartType>({
            kategori: [],
            total: [],
        });
    const [chartDataPengeluaran, setChartDataPengeluaran] =
        useState<DataChartType>({
            kategori: [],
            total: [],
        });

    async function getDataKategori(jenisKeuangan: string) {
        try {
            const { data } = await axiosInstance.get(
                "/api/kategori/" + jenisKeuangan
            );
            setListKategori(data.data);
            setJumlahNominal(0);
            setKategoriSelected(data.data[0].id);
            setTanggal(new Date().toISOString().split("T")[0]);
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    async function getDataKeuangan() {
        try {
            const { data } = await axiosInstance.get("/api/keuangan");
            setListKeuangan(data.data);
            const datakeuangan = hitungKeuangan(data.data);
            setSaldo(datakeuangan.pendapatan - datakeuangan.pengeluaran);
            setTotalPendapatan(datakeuangan.pendapatan);
            setTotalPengeluaran(datakeuangan.pengeluaran);

            const rekap = rekapDataKategori(data.data);
            setChartDataPendapatan(rekap.PENDAPATAN);
            setChartDataPengeluaran(rekap.PENGELUARAN);
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    async function submitDataKeuangan(e: { preventDefault: () => void }) {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/api/keuangan", {
                kategori_id: kategoriSelected,
                tanggal: tanggal,
                jumlah: jumlahNominal,
            });

            alertSuccess(res.data.message);
            getDataKeuangan();
            getDataKategori(jenisKeuangan);
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    async function deleteDataKeuangan(id: number) {
        try {
            const res = await axiosInstance.delete("/api/keuangan/" + id);
            console.log(res.data);
            getDataKeuangan();
            getDataKategori(jenisKeuangan);
        } catch (error) {
            alertError(
                (error as any).response?.data?.message || "An error occurred"
            );
        }
    }

    useEffect(() => {
        getDataKategori(jenisKeuangan);
        getDataKeuangan();
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-white">
            <RandomBg />
            <RandomBg />
            <Link
                href="/kategori"
                className="fixed z-[9999] flex items-center justify-center w-12 h-12 text-xl text-white transition rounded-full shadow-lg bg-slate-500 top-4 right-4 hover:bg-slate-700"
            >
                <Settings />
            </Link>

            <Head title="Home" />
            <div className="container grid items-center justify-center grid-cols-1 gap-5 p-4 mx-auto lg:grid-cols-3">
                <section className="z-50 hidden gap-3 p-4 font-mono bg-white border-2 border-dashed rounded-lg border-sky-200 lg:block">
                    <div className="text-xl font-semibold text-slate-700">
                        PENDAPATAN
                    </div>
                    <div>{formatCurrencyRp(totalPendapatan)}</div>
                    {totalPendapatan !== 0 ? (
                        <PayChart theme="green" data={chartDataPendapatan} />
                    ) : (
                        ""
                    )}
                </section>
                <section className="z-50 gap-3 p-4 font-mono bg-white border-2 border-dashed rounded-lg border-sky-200">
                    <AlertYell
                        text={`Sisa keseluruhan saldo kamu: ${formatCurrencyRp(
                            saldo
                        )}`}
                    />
                    <div className="w-3/4 mx-auto my-2">
                        {jenisKeuangan === JenisKeuangan.PENDAPATAN ? (
                            <GrowUp />
                        ) : (
                            <GrowDown />
                        )}
                    </div>
                    <div className="flex items-center justify-around mb-4">
                        <button
                            className={`w-full cursor-pointer font-bold py-2 rounded-l-lg border ${
                                jenisKeuangan === JenisKeuangan.PENDAPATAN
                                    ? "bg-gradient-to-r from-green-400 to-blue-500 text-white border-green-400"
                                    : "border-gray-400 text-gray-700"
                            }`}
                            onClick={() => {
                                setJenisKeuangan(JenisKeuangan.PENDAPATAN);
                                getDataKategori(JenisKeuangan.PENDAPATAN);
                            }}
                        >
                            PENDAPATAN
                        </button>
                        <button
                            className={`w-full cursor-pointer font-bold py-2 rounded-r-lg border ${
                                jenisKeuangan === JenisKeuangan.PENGELUARAN
                                    ? "bg-gradient-to-r from-red-400 to-yellow-500 text-white border-yellow-400"
                                    : "border-gray-400 text-gray-700"
                            }`}
                            onClick={() => {
                                setJenisKeuangan(JenisKeuangan.PENGELUARAN);
                                getDataKategori(JenisKeuangan.PENGELUARAN);
                            }}
                        >
                            PENGELUARAN
                        </button>
                    </div>
                    <form
                        onSubmit={submitDataKeuangan}
                        className="flex flex-col items-center gap-4 mt-5"
                    >
                        <div className="relative z-0 w-full mb-5">
                            <input
                                type="number"
                                name="money"
                                placeholder=" "
                                onChange={(e) =>
                                    setJumlahNominal(parseInt(e.target.value))
                                }
                                value={jumlahNominal === 0 ? "" : jumlahNominal}
                                className="block w-full px-0 pt-3 pb-2 pl-8 mt-0 bg-transparent border-0 border-b-2 appearance-none border-sky-200 focus:outline-none focus:ring-0 focus:border-sky-200"
                            />
                            <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">
                                Rp
                            </div>
                            <label
                                htmlFor="money"
                                className="absolute text-gray-500 duration-300 top-3 left-8 -z-1 origin-0"
                            >
                                Masukkan nominal{" "}
                                {jenisKeuangan === JenisKeuangan.PENDAPATAN
                                    ? "pendapatan"
                                    : "pengeluaran"}
                            </label>
                            <span
                                className="hidden text-sm text-red-600"
                                id="error"
                            >
                                Amount is required
                            </span>
                        </div>
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
                                    setKategoriSelected(
                                        parseInt(e.currentTarget.value)
                                    )
                                }
                                className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none border-sky-200 z-1 focus:outline-none focus:ring-0 focus:border-sky-200"
                            >
                                {listKategori.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nama_kategori}
                                    </option>
                                ))}
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
                                type="date"
                                name="date"
                                placeholder=" "
                                defaultValue={
                                    new Date().toISOString().split("T")[0]
                                }
                                onChange={(e) => setTanggal(e.target.value)}
                                className="block w-full px-0 pt-3 pb-2 mt-0 bg-transparent border-0 border-b-2 appearance-none border-sky-200 focus:outline-none focus:ring-0 focus:border-sky-200"
                            />
                            <label
                                htmlFor="date"
                                className="absolute text-gray-500 duration-300 top-3 -z-1 origin-0"
                            >
                                Tanggal
                            </label>
                            <span
                                className="hidden text-sm text-red-600"
                                id="error"
                            >
                                Date is required
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-2 mt-1 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none cursor-pointer bg-sky-400 hover:bg-sky-600 hover:shadow-lg focus:outline-none"
                        >
                            Tambah
                        </button>
                    </form>
                    <hr className="my-5 border border-slate-300" />
                    <div className="flex flex-col gap-2 overflow-auto h-[100px]">
                        {listKeuangan.length === 0 && (
                            <div className="flex items-center justify-center w-full h-12">
                                <p className="text-lg font-semibold text-gray-500">
                                    Belum ada data keuangan
                                </p>
                            </div>
                        )}
                        {listKeuangan.map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-3"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center justify-center w-10 h-10 p-1 rounded">
                                    {item.kategori.jenis_kategori ===
                                    JenisKeuangan.PENDAPATAN ? (
                                        <img src={up} alt="up" />
                                    ) : (
                                        <img src={down} alt="down" />
                                    )}
                                </div>
                                <div className="grow">
                                    <p className="font-semibold">
                                        {item.kategori.nama_kategori}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.kategori.jenis_kategori ===
                                        JenisKeuangan.PENDAPATAN ? (
                                            <span className="text-green-500">
                                                +{" "}
                                                {formatCurrencyRp(item.jumlah)}
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                -{" "}
                                                {formatCurrencyRp(item.jumlah)}
                                            </span>
                                        )}{" "}
                                        - {item.tanggal}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteDataKeuangan(item.id)}
                                    className="flex items-center justify-center w-10 h-10 transition duration-200 rounded text-slate-500 hover:bg-slate-500 hover:text-white"
                                >
                                    <Trash2 />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
                <section className="z-50 gap-3 p-4 font-mono bg-white border-2 border-dashed rounded-lg border-sky-200 lg:hidden">
                    <div className="text-xl font-semibold text-slate-700">
                        PENDAPATAN
                    </div>
                    <div>{formatCurrencyRp(totalPendapatan)}</div>
                    {totalPendapatan !== 0 ? (
                        <PayChart theme="green" data={chartDataPendapatan} />
                    ) : (
                        ""
                    )}
                </section>
                <section className="z-50 gap-3 p-4 font-mono bg-white border-2 border-dashed rounded-lg border-sky-200">
                    <div className="text-xl font-semibold text-slate-700">
                        PENGELUARAN
                    </div>
                    <div>{formatCurrencyRp(totalPengeluaran)}</div>
                    {totalPengeluaran !== 0 ? (
                        <PayChart theme="red" data={chartDataPengeluaran} />
                    ) : (
                        ""
                    )}
                </section>
            </div>
        </div>
    );
}

enum JenisKeuangan {
    PENDAPATAN = "PENDAPATAN",
    PENGELUARAN = "PENGELUARAN",
}

interface KategoriType {
    id: number;
    jenis_kategori: string;
    nama_kategori: string;
}

interface ListKeuanganType {
    created_at: string;
    id: number;
    jumlah: number;
    kategori: KategoriType;
    kategori_id: number;
    tanggal: string;
    updated_at: string;
}

interface TransaksiType {
    jumlah: number;
    kategori: {
        jenis_kategori: "PENDAPATAN" | "PENGELUARAN";
        nama_kategori: string;
    };
}

interface DataChartType {
    kategori: string[];
    total: number[];
}

function formatCurrencyRp(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

function hitungKeuangan(data: TransaksiType[]) {
    let pendapatan = 0;
    let pengeluaran = 0;

    for (const item of data) {
        if (item.kategori.jenis_kategori === "PENDAPATAN") {
            pendapatan += item.jumlah;
        } else if (item.kategori.jenis_kategori === "PENGELUARAN") {
            pengeluaran += item.jumlah;
        }
    }

    return {
        pendapatan,
        pengeluaran,
    };
}

function rekapDataKategori(data: TransaksiType[]) {
    const result: Record<string, { kategori: string[]; total: number[] }> = {};

    for (const item of data) {
        const { jenis_kategori, nama_kategori } = item.kategori;
        const jumlah = item.jumlah;

        if (!result[jenis_kategori]) {
            result[jenis_kategori] = { kategori: [], total: [] };
        }

        const kategoriIndex =
            result[jenis_kategori].kategori.indexOf(nama_kategori);

        if (kategoriIndex === -1) {
            result[jenis_kategori].kategori.push(nama_kategori);
            result[jenis_kategori].total.push(jumlah);
        } else {
            result[jenis_kategori].total[kategoriIndex] += jumlah;
        }
    }

    return result;
}
