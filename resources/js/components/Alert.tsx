export default function AlertYell({ text }: { text: string }) {
  return (
    <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 bg-amber-50/50 relative">
      <div className="flex gap-3">
        <div className="text-amber-500 text-xl pt-0.5">💡</div>
        <p className="text-amber-800 font-medium">{text}</p>
      </div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full border-2 border-amber-200"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white rounded-full border-2 border-amber-200"></div>
    </div>
  );
}
