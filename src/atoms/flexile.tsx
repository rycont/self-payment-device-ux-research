import { styled } from "@/stitches.config";

export const Hexile = styled('div', {
    display: 'flex',
    variants: {
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
        filly: {
            true: {
                width: '100%'
            }
        },
        fillx: {
            true: {
                height: '100%'
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
    x?: | 'top' | 'bottom' | 'center';
    y?: | 'right' | 'left' | 'center' | 'space';
    gap?: number;
    children: JSX.Element[];
}

export const Vexile = (props: FlexileProps) => {
    // if (props.gap) {
    //     return <VexileCore {...props} style={{
    //         margin: -props.gap + 'rem'
    //     }}>
    //         {props.children}
    //     </VexileCore>
    // }
    return <VexileCore css={{
        "--gap": props.gap + "rem"
    }} {...props} />
}
