import { Vexile } from "@/component";
import { styled } from "@stitches/react";

export const ViewArea = styled(Vexile, {
  backgroundColor: "$background",
});

export const PurchaseButtonWrapper = styled(Vexile, {
  backgroundColor: "$accent",
  color: "white"
})

export const NonBarcodeProductWrapper = styled(Vexile, {
  position: "absolute",
  bottom: "30rem",
  width: "100%"
})
