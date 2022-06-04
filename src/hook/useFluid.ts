import TinyliciousClient from '@fluidframework/tinylicious-client'
import { IFluidLoadable } from '@fluidframework/core-interfaces'
import { SharedMap } from 'fluid-framework'
import { useEffect, useState } from 'react'
import { FLUID_CONTAINER_ID } from '@/constants'

const client = new TinyliciousClient({
  connection: {
    domain: 'https://fluid.rycont.ninja',
    port: 443,
  },
})

const containerSchema = {
  initialObjects: { myMap: SharedMap },
}

const dataKey = 'products'

const getMyMap = async () => {
  const containerId = FLUID_CONTAINER_ID
  const { container } = await client.getContainer(containerId, containerSchema)
  return container.initialObjects.myMap
}

export const useFluid = <T>(
  key: string,
  initialValue: T
): [T, (d: T) => void] => {
  const [value, setValue] = useState(initialValue)
  const [fluidMap, setFluidMap] = useState<IFluidLoadable>()

  useEffect(() => {
    getMyMap().then((e) => {
      console.log(e)
      setFluidMap(e)
    })
  }, [])

  useEffect(() => {
    if (!fluidMap) return

    const syncView = () => {
      //@ts-ignore
      const fetchedValue = fluidMap.get(key)
      if (fetchedValue) return setValue(fetchedValue)

      //@ts-ignore
      fluidMap.set(key, initialValue)
    }
    syncView()

    //@ts-ignore
    fluidMap.on('valueChanged', syncView)

    //@ts-ignore
    return () => fluidMap.off('valueChanged', syncView)
  }, [fluidMap, initialValue, key])

  //@ts-ignore
  return [
    value,
    (e) => {
      //@ts-ignore
      if (fluidMap) fluidMap.set(key, e)
      else console.log('fluid is not ready')
    },
  ]
}
