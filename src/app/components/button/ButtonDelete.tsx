import { on } from 'events';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';
export const DeleteButton = (props: {
  api: string;
  id: string;
  onDeleteSuccess: (id: string) => void;
}) => {
  const { api, id, onDeleteSuccess } = props;
  const handleDelete = () => {
    const confirm = window.confirm('Bạn có chắc muốn xóa file này');
    if (confirm) {
      fetch(api, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            toast.success(data.message);
            onDeleteSuccess(id);
          }
          if (data.success === false) {
            toast.error(data.message);
          }
        });
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 text-red-400 hover:underline"
      >
        Xóa
      </button>
    </>
  );
};
