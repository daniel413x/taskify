import { ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { OrganizationList } from '@clerk/nextjs';

const SelectOrgPage = () => (
  <OrganizationList
    hidePersonal
    afterSelectOrganizationUrl={`/${ORGANIZATION_ROUTE}/:id`}
    afterCreateOrganizationUrl={`/${ORGANIZATION_ROUTE}/:id`}
  />
);

export default SelectOrgPage;
