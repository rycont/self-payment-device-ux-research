import { CONFIG, PUBSUB_URI } from '@/constants'

const subs: Record<string, ((data: string) => void)[]> = {}

const listenPubSub = async () => {
  try {
    const res = JSON.parse(
      await (await fetch(import.meta.env.VITE_VIRTUAL_SCANNER_SERVER)).text()
    )
    console.log(res)
    if (!isPubSubData(res)) throw new Error()

    subs[res.topic].forEach((sub) => sub(res.data))
  } catch (e) {
  } finally {
    listenPubSub()
  }
}

interface PubSubData {
  topic: string
  data: string
}

const isPubSubData = (data: any): data is PubSubData => {
  return (
    data &&
    'topic' in data &&
    typeof data.topic === 'string' &&
    'data' in data &&
    typeof data.data === 'string'
  )
}

if (CONFIG.USE_VIRTUAL_SCANNER) {
  listenPubSub()
}

export function subscribeTopic(topic: string, onData: (data: string) => void) {
  if (!CONFIG.USE_VIRTUAL_SCANNER)
    throw new Error('Virtual scanner is not enabled')

  subs[topic] = [...(subs[topic] || []), onData]

  return () => {
    subs[topic] = subs[topic].filter((sub) => sub !== onData)
  }
}
