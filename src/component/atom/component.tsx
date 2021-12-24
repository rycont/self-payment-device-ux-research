import { leftArrow } from "@/asset";
import { Description, GoBackButton, Hexile, PlainLink } from ".";

export const GoBack: React.FC<{
    to?: string;
}> = props =>
        <Hexile gap={2}>
            <GoBackButton src={leftArrow} />
            <PlainLink to={props.to || '/'}><Description>{props.children || "이전 화면으로"}</Description></PlainLink>
        </Hexile>
