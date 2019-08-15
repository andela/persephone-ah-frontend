const selectStyle = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#219653',
    color: '#fff',
    borderColor: isFocused ? 'none' : '#219653',
    outline: 'none',
    height: '45px'
  }),
  container: styles => ({
    ...styles,
    outline: 'none',
    height: '45px',
    borderColor: 'none',
    color: '#fff'
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = '#219653';
    return {
      ...styles,
      backgroundColor: isFocused || isSelected ? color : 'white',
      color: isFocused || isSelected ? '#fff' : color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      textTransform: 'capitalize'
    };
  },
  placeholder: styles => ({
    ...styles,
    color: '#fff'
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white',
    textTransform: 'capitalize'
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: '#fff'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    color: '#fff'
  }),
  menu: styles => ({
    ...styles,
    zIndex: 9999
  })
};

export default selectStyle;
