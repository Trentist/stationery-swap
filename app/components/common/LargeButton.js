import React from 'react';
import CustomButton from './CustomButton';

export default LargeButton = (props) => {

  const new_props = {...props};
  new_props.style = {
    ...props.style, 
    height: 50,
    fontSize: 16,
    borderRadius: 25,
    fontWeight: 'bold'
  }
  return (
    <CustomButton {...new_props} />
  );
};
