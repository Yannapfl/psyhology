'use client';

export const AppRoutes = {
    start: '/',
    login: '/login',
    homeclient: '/homeclient',
    homepsyhology: '/homepsyhology',
    application_psy: '/application/psyhology',
    application_client: '/application/client',
    clients: '/admin/clients',
    psyhologists: '/admin/psyhologists',
    changes: '/admin/changes',
    complaints: '/admin/complaints',
    flows: '/admin/flows',
    flowById: (id: number | string) => `/admin/flows/${id}`,
    flowByIdClients: (id: number | string) => `/admin/flows/${id}/clients`,
    flowByIdPsychologists: (id: number | string) => `/admin/flows/${id}/psychologists`,
    flowByIdReplacements: (id: number | string) => `/admin/flows/${id}/replacements`,
    flowByIdComplaint: (id: number | string) => `/admin/flows/${id}/complaint`,
}