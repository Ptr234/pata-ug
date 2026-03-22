import NextImage, { type ImageProps } from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Img(props: ImageProps) {
  const src =
    typeof props.src === "string" && props.src.startsWith("/") && !props.src.startsWith(BASE + "/")
      ? `${BASE}${props.src}`
      : props.src;

  return <NextImage {...props} src={src} />;
}
