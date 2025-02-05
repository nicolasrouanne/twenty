import { useApplyRecordFilter } from '@/object-record/object-filter-dropdown/hooks/useApplyRecordFilter';
import { advancedFilterViewFilterGroupIdComponentState } from '@/object-record/object-filter-dropdown/states/advancedFilterViewFilterGroupIdComponentState';
import { advancedFilterViewFilterIdComponentState } from '@/object-record/object-filter-dropdown/states/advancedFilterViewFilterIdComponentState';
import { filterDefinitionUsedInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/filterDefinitionUsedInDropdownComponentState';
import { objectFilterDropdownSearchInputComponentState } from '@/object-record/object-filter-dropdown/states/objectFilterDropdownSearchInputComponentState';
import { selectedOperandInDropdownComponentState } from '@/object-record/object-filter-dropdown/states/selectedOperandInDropdownComponentState';
import { FilterDefinition } from '@/object-record/object-filter-dropdown/types/FilterDefinition';
import { getInitialFilterValue } from '@/object-record/object-filter-dropdown/utils/getInitialFilterValue';
import { getOperandsForFilterDefinition } from '@/object-record/object-filter-dropdown/utils/getOperandsForFilterType';
import { RelationPickerHotkeyScope } from '@/object-record/relation-picker/types/RelationPickerHotkeyScope';
import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useSetRecoilComponentStateV2 } from '@/ui/utilities/state/component-state/hooks/useSetRecoilComponentStateV2';
import { isDefined } from 'twenty-ui';
import { v4 } from 'uuid';

type SelectFilterParams = {
  filterDefinition: FilterDefinition;
};

export const useSelectFilterDefinitionUsedInDropdown = () => {
  const setFilterDefinitionUsedInDropdown = useSetRecoilComponentStateV2(
    filterDefinitionUsedInDropdownComponentState,
  );

  const setSelectedOperandInDropdown = useSetRecoilComponentStateV2(
    selectedOperandInDropdownComponentState,
  );

  const setObjectFilterDropdownSearchInput = useSetRecoilComponentStateV2(
    objectFilterDropdownSearchInputComponentState,
  );

  const advancedFilterViewFilterGroupId = useRecoilComponentValueV2(
    advancedFilterViewFilterGroupIdComponentState,
  );

  const advancedFilterViewFilterId = useRecoilComponentValueV2(
    advancedFilterViewFilterIdComponentState,
  );

  const setHotkeyScope = useSetHotkeyScope();

  const { applyRecordFilter } = useApplyRecordFilter();

  const selectFilterDefinitionUsedInDropdown = ({
    filterDefinition,
  }: SelectFilterParams) => {
    setFilterDefinitionUsedInDropdown(filterDefinition);

    if (
      filterDefinition.type === 'RELATION' ||
      filterDefinition.type === 'SELECT'
    ) {
      setHotkeyScope(RelationPickerHotkeyScope.RelationPicker);
    }

    setSelectedOperandInDropdown(
      getOperandsForFilterDefinition(filterDefinition)[0],
    );

    const { value, displayValue } = getInitialFilterValue(
      filterDefinition.type,
      getOperandsForFilterDefinition(filterDefinition)[0],
    );

    const isAdvancedFilter = isDefined(advancedFilterViewFilterId);

    if (isAdvancedFilter || value !== '') {
      applyRecordFilter({
        id: advancedFilterViewFilterId ?? v4(),
        fieldMetadataId: filterDefinition.fieldMetadataId,
        displayValue,
        operand: getOperandsForFilterDefinition(filterDefinition)[0],
        value,
        definition: filterDefinition,
        viewFilterGroupId: advancedFilterViewFilterGroupId,
      });
    }

    setObjectFilterDropdownSearchInput('');
  };

  return {
    selectFilterDefinitionUsedInDropdown,
  };
};
