import { Toaster } from 'sonner';
import { ListTrashFile } from './ListTrashFile';

export default function TrashPage() {
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="space-y-8 text-white">
        <h1 className="text-3xl font-bold">Thùng rác</h1>

        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] px-4 text-sm text-white/60">
          <div>Tên file</div>
          <div>Loại</div>
          <div>Ngày xóa</div>
          <div>Hành động</div>
        </div>

        {/* Rows */}
        <ListTrashFile />
      </div>
    </>
  );
}
