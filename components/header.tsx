export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-black shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Expense Tracker
        </h1>
      </div>
    </header>
  );
}
