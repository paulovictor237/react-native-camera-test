export const RouteNames = ['Home', 'CameraPeve', 'PermissionsPage'] as const;

export type Routes = Record<(typeof RouteNames)[number], undefined>;
