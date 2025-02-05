import { ReactNode } from 'react';

import { ObjectFilterDropdownComponentInstanceContext } from '@/object-record/object-filter-dropdown/states/contexts/ObjectFilterDropdownComponentInstanceContext';

type ObjectFilterDropdownScopeProps = {
  children: ReactNode;
  filterScopeId: string;
};

export const ObjectFilterDropdownScope = ({
  children,
  filterScopeId,
}: ObjectFilterDropdownScopeProps) => {
  return (
    <ObjectFilterDropdownComponentInstanceContext.Provider
      value={{ instanceId: filterScopeId }}
    >
      {children}
    </ObjectFilterDropdownComponentInstanceContext.Provider>
  );
};
