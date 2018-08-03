import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu (1, 'Dashboard', '/pages/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Inspeccion', null, null, 'users', null, true, 0),
    new Menu (22, 'Table', '/pages/inspeccion', null, 'users', null, false, 2),
    new Menu (23, 'Chart', '/pages/chart', null, 'bar-chart-o', null, false, 2),
    new Menu (24, 'Agenda', '/pages/inspeccion', null, 'book', null, false, 2),
    new Menu (3, 'Blank', '/pages/blank', null, 'bookmark-o', null, false, 0)
];

export const horizontalMenuItems = [
    new Menu (1, 'Dashboard', '/pages/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Inspeccion', null, null, 'users', null, true, 0),
    new Menu (22, 'Table', '/pages/inspeccion', null, 'users', null, false, 2),
    new Menu (23, 'Chart', '/pages/chart', null, 'bar-chart-o', null, false, 2),
    new Menu (24, 'Agenda', '/pages/inspeccion', null, 'book', null, false, 2),
    new Menu (3, 'Blank', '/pages/blank', null, 'bookmark-o', null, false, 0)
];