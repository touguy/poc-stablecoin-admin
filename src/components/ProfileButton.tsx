import { useRouter } from "next/router";
import React, { useState } from "react";

interface ProfileButtonProps {
  onLogout: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        localStorage.getItem("address") || ""
      );
      alert("지갑주소가 복사되었습니다.");
      setOpen(false);
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout();
    router.replace("/login");
  };

  return (
    <div className="absolute right-24 p-2 rounded hover:bg-gray-100">
      <button
        className="px-4 py-2 bg-gray-100 text-black-700 rounded-lg border border-gray-300 hover:bg-gray-200"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        Profile
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
          <button
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={handleCopy}
          >
            지갑주소 복사
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
