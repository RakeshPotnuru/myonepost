import { FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import { IoIosPower, IoMdShare } from "react-icons/io";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbSquareRoundedPlus } from "react-icons/tb";

export const ActionIcons = {
  Liked: IoHeart,
  Like: IoHeartOutline,
  Comment: FaRegComment,
  Bookmark: FaRegBookmark,
  Bookmarked: FaBookmark,
  Logout: IoIosPower,
  Plus: TbSquareRoundedPlus,
  Close: RxCross2,
  Share: IoMdShare,
  ShareVia: FiShare,
  Delete: MdDeleteOutline,
};
