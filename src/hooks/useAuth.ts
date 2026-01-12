import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [infoUser, setInforUser] = useState<any>(null);

  const pathname = usePathname();

  useEffect(() => {
    setIsLogin(null); // reset về trạng thái "đang check"

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/profile`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.success === true) {
          setIsLogin(true);

          // reset role
          setInforUser(res.data);
        } else {
          setIsLogin(false);
          setInforUser(null);
        }
      })
      .catch(() => {
        setIsLogin(false);
        setInforUser(null);
      });
  }, [pathname]);

  return {
    isLogin,
    infoUser,
  };
};
