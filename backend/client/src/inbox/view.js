import React, {Fragment as F} from 'react';
import Threads from './threads';

export const View = (props) => {
  console.log('@view', props)
  const renderView = props.user ? < Threads user = {
    props.user
  }
  /> : ''
  return ( <F> {
      renderView
    } </F>
  )
}