import { ChangeEvent, lazy, Suspense, useMemo, useState } from 'react'

import { metadata } from '../nodes/metadata.js'

function Flow() {
  const [selectedNodeUrl, selectedNodUrl] = useState<string>(
    metadata.nodes[0].url || ''
  )

  const Settings = useMemo(() => {
    if (!selectedNodeUrl) return undefined
    const p = selectedNodeUrl.split('/')
    switch (p.length) {
      case 1:
        return lazy(() => import(`../nodes/${p[0]}.tsx`))
      case 2:
        return lazy(() => import(`../nodes/${p[0]}/${p[1]}.tsx`))
      case 3:
        return lazy(() => import(`../nodes/${p[0]}/${p[1]}/${p[2]}.tsx`))
      case 4:
        return lazy(
          () => import(`../nodes/${p[0]}/${p[1]}/${p[2]}/${p[3]}.tsx`)
        )
      default:
        return () => <h1>INCREASE DEPTH</h1>
    }
  }, [selectedNodeUrl])

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    selectedNodUrl(ev.currentTarget.value)
  }

  return (
    <div>
      SelectedNode:
      <select onChange={onChange}>
        {metadata.nodes.map((node) => (
          <option key={node.url} value={node.url}>
            {node.title}
          </option>
        ))}
      </select>
      {selectedNodeUrl}
      <Suspense fallback={'loading ....'}>{Settings && <Settings />}</Suspense>
    </div>
  )
}

export default Flow
