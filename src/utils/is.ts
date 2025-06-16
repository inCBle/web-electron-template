import { APP_ENV } from '@/typings/env.d'

export const isNull = (value: unknown): value is null | undefined =>
  value === null || value === void 0;

export const isWeb = () => __APP_ENV__ === APP_ENV.WEB;
