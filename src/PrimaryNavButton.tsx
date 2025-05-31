export function PrimaryNavButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      className="bg-blue-600 text-white rounded-lg px-6 py-2 font-semibold shadow hover:bg-blue-700 transition w-full mt-auto"
      onClick={onClick}
    >
      {text}
    </button>
  );
} 