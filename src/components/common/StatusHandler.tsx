interface StatusHandlerProps {
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export default function StatusHandler({
  loading = false,
  error = null,
  empty = false,
  emptyMessage = '데이터가 없습니다.',
  children,
}: StatusHandlerProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 text-sm">로딩중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-red-500 font-medium">오류가 발생했습니다</p>
        <p className="text-gray-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-4xl mb-4">📭</div>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
