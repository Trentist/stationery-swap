import React from 'react';
import CustomButton from './CustomButton';

export default SmallButton = (props) => {

  const new_props = {...props};
  new_props.style = {
    ...props.style, 
    height: 26,
    fontSize: 12,
    borderRadius: 3,
    fontWeight: 'bold'
  }
  return (
    <CustomButton {...new_props} />
  );
};
