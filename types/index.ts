import { SVGProps } from "react";

import { Doc } from "@/convex/_generated/dataModel";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Company = Doc<"companies">;
