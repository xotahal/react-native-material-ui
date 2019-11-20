// @flow
import React from 'react'
import getTheme from './getTheme'

import type { Theme } from './types'

export default React.createContext<Theme>(getTheme())
