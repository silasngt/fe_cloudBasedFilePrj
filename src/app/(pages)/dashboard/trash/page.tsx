import { Trash2, RotateCcw, FileText } from 'lucide-react';

const trashedFiles = [
  {
    id: 1,
    name: 'old-report.pdf',
    type: 'PDF',
    deleted_at: '2026-01-04',
  },
  {
    id: 2,
    name: 'image-old.png',
    type: 'Image',
    deleted_at: '2026-01-05',
  },
];

export default function TrashPage() {
  return (
    <>
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
        <div className="space-y-3">
          {trashedFiles.map((f) => (
            <div
              key={f.id}
              className="grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl"
            >
              {/* Name */}
              <div className="flex items-center gap-3">
                <Trash2 size={18} className="text-red-400" />
                {f.name}
              </div>

              {/* Type */}
              <div>{f.type}</div>

              {/* Deleted at */}
              <div>{f.deleted_at}</div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-cyan-300 hover:underline">
                  <RotateCcw size={16} />
                  Khôi phục
                </button>

                {/* Optional: delete forever
                <button className="flex items-center gap-1 text-red-400 hover:underline">
                  <Trash2 size={16} />
                  Xóa vĩnh viễn
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
