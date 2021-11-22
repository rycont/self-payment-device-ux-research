import { styled } from "@/stitches.config";

export const Hexile = styled('div', {
    display: 'flex',
    variants: {
        fill: {
            true: {
                flex: 1
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

export const Vexile = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    variants: {
        fill: {
            true: {
                flex: 1
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