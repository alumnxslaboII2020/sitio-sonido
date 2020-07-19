import React, { useMemo } from "react"
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"

const ICON_MAP = {
  facebook: FaFacebook,
  github: FaGithub,
  instagram: FaInstagram,
  twitter: FaTwitter,
  youtube: FaYoutube,
}

function Icon({ name }) {
  const MappedIcon = useMemo(() => ICON_MAP[name], [name])
  return <MappedIcon />
}

export default Icon
