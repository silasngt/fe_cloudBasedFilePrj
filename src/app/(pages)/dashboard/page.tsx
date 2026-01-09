import { Toaster } from 'sonner';
import { ListFile } from './file/ListFile';
import { UploadFile } from './file/UploadFile';

export default function FileManagerPage() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="h-full flex flex-col gap-6 text-white">
        {/* TITLE */}
        <h1 className="text-3xl font-bold shrink-0">Quản lý file</h1>

        {/* UPLOAD */}
        <UploadFile />
        {/* FILE LIST */}
        <ListFile />
      </div>
    </>
  );
}
