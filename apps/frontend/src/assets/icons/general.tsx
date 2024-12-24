import { BsFillSunFill } from "react-icons/bs";
import { FaBan, FaImage, FaLink, FaRegClock, FaVideo } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { IoMdTrendingUp } from "react-icons/io";
import { IoAlertCircleOutline, IoCalendar, IoText } from "react-icons/io5";
import { MdAudiotrack } from "react-icons/md";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { SiCodefresh } from "react-icons/si";
import { TbDotsVertical, TbFlag3, TbLoader } from "react-icons/tb";

export const GeneralIcons = {
  Trending: IoMdTrendingUp,
  Subscribe: RiUserFollowLine,
  UnSubscribe: RiUserUnfollowLine,
  Fresh: SiCodefresh,
  Menu: TbDotsVertical,
  Notification: GoBell,
  TextPost: IoText,
  ImagePost: FaImage,
  VideoPost: FaVideo,
  AudioPost: MdAudiotrack,
  Link: FaLink,
  Calendar: IoCalendar,
  Sun: BsFillSunFill,
  Flag: TbFlag3,
  Loading: TbLoader,
  Reject: FaBan,
  Clock: FaRegClock,
  Alert: IoAlertCircleOutline,
};
