import React, { useMemo } from "react"
import {
  FaBandcamp,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaPatreon,
  FaReact,
  FaSoundcloud,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"
import { GrGatsbyjs, GrGraphQl } from "react-icons/gr"
import { MdClose, MdMenu } from "react-icons/md"

const ICON_MAP = {
  bandcamp: FaBandcamp,
  close: MdClose,
  facebook: FaFacebook,
  gatsby: GrGatsbyjs,
  github: FaGithub,
  graphql: GrGraphQl,
  instagram: FaInstagram,
  link: FaLink,
  menu: MdMenu,
  patreon: FaPatreon,
  react: FaReact,
  soundcloud: FaSoundcloud,
  twitter: FaTwitter,
  youtube: FaYoutube,
}

function Icon({ name }) {
  const MappedIcon = useMemo(() => ICON_MAP[name], [name])
  return name && <MappedIcon />
}

export default Icon
