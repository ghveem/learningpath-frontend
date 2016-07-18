import React, { PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import cloneDeep from 'lodash/cloneDeep';
import polyglot from '../../../i18n';

const LearningPathStepLicense = (props) => {
  const { value, licenseOptions, onChange, onBlur } = props;
  let currentValue = cloneDeep(value);
  const licenses = cloneDeep(licenseOptions);
  licenses.unshift({ description: polyglot.t('editPathStep.noLicensChosen'), license: undefined });
  if (typeof value === 'string' || !value.license) { // Handle redux form values witch are initialized as strings
    currentValue = cloneDeep(licenses[0]);
  }

  return (
    <div>
      <DropdownList
        {...props}
        textField="description"
        value={currentValue}
        onBlur={() => onBlur(currentValue)}
        onChange={onChange}
        onToggle={() => {}}
        data={licenses}
      />
    </div>
  );
};

LearningPathStepLicense.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  licenseOptions: PropTypes.array.isRequired,
};

export default LearningPathStepLicense;
