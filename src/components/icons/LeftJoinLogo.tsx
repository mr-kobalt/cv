import { LeftJoin } from "@/images/logos";
import Image, { ImageProps } from "next/image";

export const LeftJoinLogo = (props: ImageProps) => {
  return (
    <Image src={LeftJoin} alt="LeftJoinLogo" className={"dark:brightness-[100] "+props.className}/>
  );
};
