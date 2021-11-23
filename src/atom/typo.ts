import { styled } from "#/stitches.config";
import { Property } from "@stitches/react/types/css";

const typoGenerator = (
  fontSize: number,
  fontWeight: Property.FontWeight,
  opacity?: number
) =>
  styled("p", {
    fontSize: fontSize + "rem",
    fontWeight,
    opacity,
    margin: 0,
    letterSpacing: "-0.03em",
    variants: {
      accent: {
        true: {
          color: "$accent",
        },
      },
    },
  });

export const PageHeader = typoGenerator(5, "700");
export const SubHeader = typoGenerator(3, "400", 0.6);
export const SectionHeader = typoGenerator(4.5, "600");
export const Regular = typoGenerator(4, "500");
export const RegularImportant = typoGenerator(4, "600");
export const Description = typoGenerator(3.5, "500", 0.6);
export const DescriptionImportant = typoGenerator(3.5, "500");
