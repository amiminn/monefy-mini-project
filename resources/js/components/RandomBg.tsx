export default function RandomBg() {
    const gradientColors = ["blue", "yellow", "purple", "pink"];
    const randomGradient = gradientColors[Math.floor(Math.random() * 5)];

    return (
        <div>
            <div
                className={`transition-all duration-1000 absolute w-[300px] h-[300px] z-50 bg-gradient-to-r from-blue-400 via-purple-400 to-${randomGradient}-400 rounded-full blur-3xl opacity-50`}
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: "translate(-50%, -50%)",
                }}
            ></div>
            <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        // <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
    );
}
