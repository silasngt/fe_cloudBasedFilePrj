import { ButtonDelete } from '@/app/components/button/ButtonDelete';
import { DownloadButton } from '@/app/components/button/ButtonDownload';
import { formatFileSize, getFileTypeLabel } from '@/hooks/formatFile';
import { Image, FileText, File, Download, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'sonner';
const FileIcon = ({ type }: { type: string }) => {
  if (type === 'Image') return <Image size={18} />;
  if (type === 'PDF') return <FileText size={18} />;
  return <File size={18} />;
};
export const ItemFile = (props: {
  file: any;
  onRenameSuccess: (id: number, newName: string) => void;
  onDeleteSuccess: (id: string) => void;
}) => {
  const { file, onRenameSuccess, onDeleteSuccess } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.file_name);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    if (newName.trim() === file.file_name) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file/rename/${file.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_name: newName }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(async (res) => {
        // console.log(res);
        if (res.success === true) {
          toast.success('Đổi tên file thành công');
          onRenameSuccess(file.id, newName); // update local object
          setIsEditing(false);
        }
      })
      .catch(() => {
        toast.error('Đổi tên file thất bại');
        setNewName(file.file_name); // rollback
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] items-center px-3 py-3 bg-white/5 hover:bg-white/10 transition rounded-lg">
        {/* FILE NAME */}
        <div className="flex items-center gap-3">
          <FileIcon type={file.mime_type} />

          {isEditing ? (
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              disabled={loading}
              className="bg-transparent border-b border-cyan-400 outline-none text-white w-full"
            />
          ) : (
            <span
              className="cursor-pointer hover:underline"
              onClick={() => setIsEditing(true)}
            >
              {file.file_name}
            </span>
          )}
        </div>

        <div>{getFileTypeLabel(file.mime_type)}</div>
        <div>{formatFileSize(file.file_size)}</div>
        <div>{moment(file.updated_at).locale('vi').format('DD/MM/YYYY')}</div>

        <div className="flex gap-4">
          <DownloadButton
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/download/${file.id}`}
            id={file.id}
          />
          <ButtonDelete
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${file.id}`}
            id={file.id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
    </>
  );
};
