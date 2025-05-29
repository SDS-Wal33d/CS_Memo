import type { InferRequestType, InferResponseType } from 'hono/client'
import client from '../client'

const adminSettings = client.api.admin.settings

export type AdminSettings = InferResponseType<typeof adminSettings.$get>['settings']
export type AdminSettingsRequest = InferRequestType<typeof adminSettings.$post>['json']

export async function getAdminSettings(): Promise<AdminSettings> {
    const response = await adminSettings.$get()
    const { settings } = await response.json()
    return settings
}

export async function updateAdminSettings(settings: AdminSettingsRequest) {
    const response = await adminSettings.$post({
        "json": settings
    })

    if (!response.ok) {
        return false
    }

    return true
}