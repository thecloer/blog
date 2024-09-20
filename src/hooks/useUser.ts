import { siteConfig } from '@/configs/site';

export const useUser = () => ({
  user: {
    name: siteConfig.author,
    email: siteConfig.email,
    avatar: 'https://avatars.githubusercontent.com/u/83699438?v=4',
  },
});
