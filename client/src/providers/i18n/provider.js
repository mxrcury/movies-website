import React, { useContext, useEffect, useState } from 'react'
import { IntlProvider as Provider } from 'react-intl'
import { flatten } from 'flat'

import { Context } from '../context/context';
import { LOCALES } from './constants';
import { messages } from './messages';



const IntlProvider = ({children}) => {

  const {state} = useContext(Context)

  return (
     <Provider messages={flatten(messages[state.locale])} locale={state.locale} defaultLocale={LOCALES.ENGLISH} >
        {children}
     </Provider>
  );
}

export default IntlProvider

