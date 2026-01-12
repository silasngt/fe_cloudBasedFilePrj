'use client';
import { useAuth } from '@/hooks/useAuth';
import { Mail, User, Calendar, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { formatGB } from '@/hooks/formatFile';
import moment from 'moment';
import JustValidate from 'just-validate';
import { toast } from 'sonner';

// Đăng ký plugin
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);
export const FormProfile = () => {
  const { infoUser } = useAuth();
  const [detailProfile, setDetailProfile] = useState<any>(null);
  const [avatars, setAvatars] = useState<any[]>([]);

  useEffect(() => {
    if (detailProfile) {
      if (detailProfile.avatar_file) {
        setAvatars([
          {
            source: detailProfile.avatar_file,
          },
        ]);
      }

      const validator = new JustValidate('#formProfile');

      validator.addField('#fullName', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập họ tên!',
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
        },
      ]);
    }
  }, [detailProfile]);

  // Xử lý khi submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const fullName = event.target.fullName.value;
    let avatar = null;

    if (avatars.length > 0) {
      avatar = avatars[0].file;
    }

    // // Tạo FormData
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('avatar_file', avatar);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/update`, {
      method: 'POST',
      body: formData,
      credentials: 'include', // Gửi kèm cookie
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success === false) {
          toast.error(res.message);
        }
        if (res.success === true) {
          toast.success(res.message);
          setDetailProfile(res.data);
        }
      });
  };
  // Storage usage example values
  const usedStorage: any = infoUser?.used_storage
    ? formatGB(infoUser.used_storage)
    : 0; // GB
  const totalStorage: any = infoUser?.storage_limit
    ? formatGB(infoUser.storage_limit)
    : 10; // GB
  const percentUsed = Math.min(
    Math.round((usedStorage / totalStorage) * 100),
    100
  );
  return (
    <>
      <form
        id="formProfile"
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 pb-20 flex gap-8 relative"
      >
        {/* Avatar */}
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
          {/* Logo hiện tại (placeholder) */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
              <img
                className="w-full h-full rounded-full object-cover"
                src={detailProfile?.avatar_url || infoUser?.avatar_url}
                alt={detailProfile?.fullName || infoUser?.full_name}
              />
            </div>
            <p className="text-[11px] text-gray-400">Xem trước logo hiện tại</p>
          </div>

          {/* Ô upload */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-white-700 ">
              Tải lên logo mới
            </label>
            <FilePond
              name="avatars"
              files={avatars}
              onupdatefiles={setAvatars}
              allowMultiple={false} //Chỉ chọn 1 ảnh
              allowRemove={true} //Cho phép xóa ảnh
              labelIdle="+"
              acceptedFileTypes={['image/*']}
            />
            <p className="text-[11px] text-gray-400">
              Định dạng: JPG, PNG. Kích thước tối đa 5MB.
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {' '}
            <p className="text-sm text-white/60 flex items-center gap-2">
              {' '}
              <User size={16} /> Full name{' '}
            </p>{' '}
            {/* <p className="font-semibold text-lg">{infoUser?.full_name}</p>{' '} */}
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              defaultValue={detailProfile?.fullName || infoUser?.full_name}
            />
          </div>

          <div>
            <p className="text-sm text-white/60 flex items-center gap-2">
              <Mail size={16} /> Email
            </p>
            <p className="font-semibold text-lg">{infoUser?.email}</p>
          </div>

          <div>
            <p className="text-sm text-white/60 flex items-center gap-2">
              <Calendar size={16} /> Joined at
            </p>
            <p className="font-semibold text-lg">
              {moment(infoUser?.created_at).format('DD/MM/YYYY')}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60 flex items-center gap-2">
              <UserCircle size={16} /> User Name
            </p>
            <p className="font-semibold text-lg">{infoUser?.user_name}</p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 col-span-2">
            <p className="text-xs text-white/60 mb-2">Dung lượng sử dụng</p>

            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  percentUsed < 70
                    ? 'bg-cyan-400'
                    : percentUsed < 90
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>{usedStorage} GB</span>
              <span>{totalStorage} GB</span>
            </div>
            <p className="text-[11px] text-white/40 mt-1">
              {percentUsed}% dung lượng đã sử dụng
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="absolute bottom-6 right-6 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 transition focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          Lưu thay đổi
        </button>
      </form>
    </>
  );
};
