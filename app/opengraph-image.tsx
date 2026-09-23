import { ogSize, renderDefaultOgImage } from "@/lib/og";

export const alt = "JK Edwards & Company — accounting, tax, payroll and IRS help in Hampton, Georgia";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderDefaultOgImage();
}
