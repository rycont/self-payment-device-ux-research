import { styled } from "#/stitches.config";
import { Link } from "react-router-dom";
import { PageHeader } from ".";

export const PlainLink = styled(Link, {
    textDecoration: "none",
    color: "inherit"
})

export const UnderlinedPageHeader = styled(PageHeader, {
    borderBottom: "0.5rem solid $accent",
    paddingBottom: "3rem",
    color: "$accent"
})

export const GoBackButton = styled('img', {
    width: "1rem"
})
