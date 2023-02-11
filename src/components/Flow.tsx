import { ChangeEvent, lazy, Suspense, useMemo, useState } from 'react'


import metadata from '../nodes/metadata.json'

function Flow() {
  const [selectedNodeUrl, selectedNodUrl] = useState<string>(
    metadata.nodes[0].url || ''
  )

  const Settings = useMemo(
    () =>
      selectedNodeUrl
        ? lazy(() => import(`../nodes/${selectedNodeUrl}/frontend/Settings.tsx`))
        : undefined,
    [selectedNodeUrl]
  )

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
