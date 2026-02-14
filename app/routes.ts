import { type RouteConfig, index, layout } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  layout('root.tsx', [
    index('routes/home.tsx'),
  ]),
];