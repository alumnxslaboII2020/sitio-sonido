import React, { useMemo } from "react"
import {
  FaBandcamp,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"
import { MdClose, MdMenu } from "react-icons/md"

const ICON_MAP = {
  bandcamp: FaBandcamp,
  close: MdClose,
  facebook: FaFacebook,
  github: FaGithub,
  instagram: FaInstagram,
  menu: MdMenu,
  twitter: FaTwitter,
  youtube: FaYoutube,
}

function Icon({ name }) {
  const MappedIcon = useMemo(() => ICON_MAP[name], [name])
  return <MappedIcon />
}

export default Icon
