import React from 'react';
import {Message} from 'semantic-ui-react'

const FormErrors = ({formErrors}) =>
{
  let hidden = true;
  Object.keys(formErrors).map((fieldName, i) => {
    if(formErrors[fieldName].length > 0){
      hidden = false;
    }
  })
  return(
    <div>
      {!hidden && <Message warning >
        <Message.Header>Errors!</Message.Header>
       {Object.keys(formErrors).map((fieldName, i) => {
         if(formErrors[fieldName].length > 0){
           return (
             <p key={i}>{fieldName} {formErrors[fieldName]}</p>
           )
         } else {
           return '';
         }
       })}
     </Message>}


    </div>
  )
}


export default FormErrors;
