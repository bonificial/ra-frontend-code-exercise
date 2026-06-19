import { avatarBg, avatarText, getInitials } from '@/utils/avatar';
import { ReactElement } from 'react';

type AvatarProps = {
  name: string;
};

export const Avatar = ({ name }: AvatarProps): ReactElement => {
  const initials = getInitials(name);

  return (
    <span
      className="flex h-[33px] w-[33px] flex-shrink-0 items-center justify-center rounded-full p-2 text-[10px] font-semibold leading-none"
      style={{ backgroundColor: avatarBg, color: avatarText }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
};
