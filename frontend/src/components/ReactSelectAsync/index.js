import React, { useRef, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

export default function ReactSelectAsync({ name, loadOptions, ...rest }) {
  const [val, setVal] = useState('');
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(param) {
    console.log('parseSelectValue', JSON.stringify(param));
    return param;
    // return 'value' in data ? data.value : '';
  }

  function handleInputChange(newData) {
    console.log('handleInputChange1', newData, newData.value);
    setVal(newData);
    console.log('handleInputChange2', val);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  /* function getDefaultValue() {
    // console.log('getDefaultValue');
    // console.log(defaultId);
    // console.log(options);
    if (!defaultId) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultId);
    }

    return options.filter(option => defaultValue.includes(option.id));
  } */

  return (
    <AsyncSelect
      name={fieldName}
      loadOptions={loadOptions}
      // ref={ref}
      onChange={handleInputChange}
      value="pimba"
    />
  );
}
