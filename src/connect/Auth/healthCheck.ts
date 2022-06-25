import { createAPIConnector } from '../connector'

export const healthCheck = createAPIConnector('pos-login/health', {
    method: 'GET',
    needAuth: true,
    mockHandler: () => ({
        creaatedAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
        name: '파란색 아이패드',
        disabled: false,
        is_deleted: false,
        systemId: '1',
        id: 5050
    }),
})
