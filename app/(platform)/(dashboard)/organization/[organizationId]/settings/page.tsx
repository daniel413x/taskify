import { OrganizationProfile } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

const SettingsPage = () => (
  <OrganizationProfile
    appearance={{
      elements: {
        rootBox: {
          boxShadow: 'none',
          width: '100%',
        },
        card: {
          border: '1px solid #e5e5e5',
          boxShadow: 'none',
          width: '100%',
        },
      },
    }}
  />
);

export default SettingsPage;
