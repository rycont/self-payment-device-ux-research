import { styled } from "#/stitches.config";

export const HexileCore = styled('div', {
    display: 'flex',
    gap: 'var(--gap)',
    boxSizing: 'border-box',
    variants: {
        linebreak: {
            true: {
                flexWrap: 'wrap'
            }
        },
        fillx: {
            true: {
                width: '100%'
            }
        },
        filly: {
            true: {
                height: '100%'
            }
        },
        x: {
            right: {
                justifyContent: 'flex-end'
            },
            left: {
                justifyContent: 'flex-start'
            },
            center: {
                justifyContent: 'center'
            },
            space: {
                justifyContent: 'space-between'
            }
        },
        y: {
            top: {
                alignItems: 'flex-start'
            },
            bottom: {
                alignItems: 'flex-end'
            },
            center: {
                alignItems: 'center'
            }
        },
    }
})

export const VexileCore = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--gap)',
    boxSizing: 'border-box',
    variants: {
        linebreak: {
            true: {
                flexWrap: 'wrap'
            }
        },
        filly: {
            true: {
                height: '100%'
            }
        },
        fillx: {
            true: {
                width: '100%'
            }
        },
        x: {
            top: {
                alignItems: 'flex-start'
            },
            bottom: {
                alignItems: 'flex-end'
            },
            center: {
                alignItems: 'center'
            }
        },
        y: {
            right: {
                justifyContent: 'flex-end'
            },
            left: {
                justifyContent: 'flex-start'
            },
            center: {
                justifyContent: 'center'
            },
            space: {
                justifyContent: 'space-between'
            }
        }
    }
})

interface FlexileProps {
    fillx?: boolean;
    filly?: boolean;
    gap?: number;
    linebreak?: boolean;
}

interface VexileProps extends FlexileProps {
    x?: | 'top' | 'bottom' | 'center';
    y?: | 'right' | 'left' | 'center' | 'space';
}

interface HexileProps extends FlexileProps {
    x?: | 'right' | 'left' | 'center' | 'space';
    y?: | 'top' | 'bottom' | 'center';
}

export const Vexile: React.FC<VexileProps> = props =>
    <VexileCore css={{
        "--gap": props.gap + "rem"
    }} {...props} />


export const Hexile: React.FC<HexileProps> = props =>
    <HexileCore css={{
        "--gap": props.gap + "rem"
    }} {...props} />

