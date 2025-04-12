import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

interface DataType {
    kategori: string[];
    total: number[];
}

export default function PayChart({
    data,
    theme,
}: {
    data: DataType;
    theme: "red" | "green";
}) {
    let bg;
    if (theme === "red") {
        bg = ["#B82132", "#AF1740", "#D2665A", "#740938", "#F2B28C", "#FF8383"];
    } else if (theme === "green") {
        bg = ["#5D8736", "#C7DB9C", "#809D3C", "#328E6E", "#A9C46C", "#F4FFC3"];
    }

    const payData = {
        labels: data.kategori,
        datasets: [
            {
                label: "TOTAL (Rp)",
                data: data.total,
                backgroundColor: bg,
                borderRadius: 0,
            },
        ],
    };

    return <Doughnut data={payData} />;
}
