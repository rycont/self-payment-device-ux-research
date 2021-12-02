import { styled } from "@stitches/react";
import { Description, Vexile } from "@/component";

export const ProductWrapper = styled(Vexile, {
    backgroundColor: "white",
    padding: "4rem",
    borderRadius: "2rem",
    width: "36rem",
    height: "18rem"
});

export const DiscountedPrice = styled(Description, {
    opacity: "0.36 !important",
})

DiscountedPrice.defaultProps = {
    strike: true
}
