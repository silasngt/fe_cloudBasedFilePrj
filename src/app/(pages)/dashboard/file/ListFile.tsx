'use client';
import { useEffect, useState } from 'react';
import { ItemFile } from './ItemFile';

export const ListFile = () => {
  const [listFile, setListFile] = useState<any[]>([]);
  useEffect(() => {
    const fetchFiles = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            setListFile(res.data);
          }
        });
    };

    fetchFiles(); // gọi lần đầu
    const interval = setInterval(fetchFiles, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRenameSuccess = (fileId: number, newName: string) => {
    setListFile((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, file_name: newName } : file
      )
    );
  };
  const handleDeleteSuccess = (deleteid: string) => {
    setListFile((prev) => prev.filter((file) => file.id !== deleteid));
  };
  return (
    <>
      <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] text-white/60 text-sm px-2 pb-2 border-b border-white/10 shrink-0">
            <div>Tên file</div>
            <div>Loại</div>
            <div>Dung lượng</div>
            <div>Ngày upload</div>
            <div>Hành động</div>
          </div>

          {/* ROWS */}
          <div className="flex-1 overflow-x-hidden overflow-y-visible">
            {listFile.map((file) => (
              <ItemFile
                key={file.id}
                file={file}
                onRenameSuccess={handleRenameSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}

            {listFile.length === 0 && (
              <div className="text-center text-white/60 py-10">
                Chưa có file nào
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
