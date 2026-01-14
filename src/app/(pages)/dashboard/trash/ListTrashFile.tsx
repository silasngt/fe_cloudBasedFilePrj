'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ItemTrashFile } from './ItemTrashFile';
export const ListTrashFile = () => {
  const [listTrashFile, setListTrashFile] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file/trash`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Giữ cookie
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          setListTrashFile(res.data);
        }
      });
  }, []);
  const handleRestoreSuccess = (restoreId: string) => {
    setListTrashFile((prev) => prev.filter((file) => file.id !== restoreId));
  };

  return (
    <>
      <div className="space-y-3">
        {listTrashFile.map((fileTrash) => (
          <ItemTrashFile
            key={fileTrash.id}
            fileTrash={fileTrash}
            onRestoreSuccess={handleRestoreSuccess}
          />
        ))}

        {listTrashFile.length === 0 && (
          <div className="text-center text-white/60 py-10">
            Chưa có file nào
          </div>
        )}
      </div>
    </>
  );
};
