import React from 'react'
import PropTypes from 'prop-types';

Dodo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function Dodo({title}) {
  return (
    <div style={{ color: 'red', fontSize: '24px', marginTop: '50px' }}>
      there is a missing here named {title}
    </div>
  )
}
