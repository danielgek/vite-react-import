import { ChangeEvent, lazy, Suspense, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import metadata from './nodes/metadata.json'
import Flow from './components/Flow'

function App() {

  return (
    <div>
      <Flow />
    </div>
  )
}

export default App
