'use client';

import { Image, FileText, File, Download, Trash2 } from 'lucide-react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useState } from 'react';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

const files = [
  {
    id: 1,
    name: 'image-1.png',
    type: 'Image',
    size: '2.1 MB',
    date: '2026-01-01',
  },
  {
    id: 2,
    name: 'report.pdf',
    type: 'PDF',
    size: '1.4 MB',
    date: '2026-01-02',
  },
  {
    id: 3,
    name: 'slides.ppt',
    type: 'PPT',
    size: '3.8 MB',
    date: '2026-01-03',
  },
];

const FileIcon = ({ type }: { type: string }) => {
  if (type === 'Image') return <Image size={18} />;
  if (type === 'PDF') return <FileText size={18} />;
  return <File size={18} />;
};

export default function FileManagerPage() {
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);

  return (
    <>
      <div className="h-full flex flex-col gap-6 text-white">
        {/* TITLE */}
        <h1 className="text-3xl font-bold shrink-0">Quản lý file</h1>

        {/* UPLOAD */}
        <div className="shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5">
          <h2 className="font-semibold mb-2">Upload file</h2>

          <FilePond
            files={uploadFiles}
            onupdatefiles={setUploadFiles}
            allowMultiple
            maxFiles={5}
            acceptedFileTypes={[
              'image/*',
              'application/pdf',
              'application/msword',
              'application/vnd.ms-powerpoint',
            ]}
            labelIdle='Kéo & thả file hoặc <span class="filepond--label-action">Chọn file</span>'
          />
        </div>

        {/* FILE LIST */}
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
            <div className="flex-1 overflow-y-auto mt-2 space-y-2 pr-1">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] items-center px-3 py-3 bg-white/5 hover:bg-white/10 transition rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileIcon type={f.type} />
                    {f.name}
                  </div>

                  <div>{f.type}</div>
                  <div>{f.size}</div>
                  <div>{f.date}</div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-cyan-300 hover:underline">
                      <Download size={16} />
                      Tải xuống
                    </button>
                    <button className="flex items-center gap-1 text-red-400 hover:underline">
                      <Trash2 size={16} />
                      Xóa
                    </button>
                  </div>
                </div>
              ))}

              {files.length === 0 && (
                <div className="text-center text-white/60 py-10">
                  Chưa có file nào
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
