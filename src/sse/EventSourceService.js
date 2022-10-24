let eventSource;

const subscribe = (url) => {
  eventSource = new EventSource(url)
}

const close = () => {
  eventSource.close()
}

const onmessage = (cb) => {
    eventSource.onmessage = event => cb(event.data)
}

function EventSourceService() {
  return {
    eventSource,
    subscribe,
    onmessage,
    close

  }

}

const eventSourceService = EventSourceService()


export default eventSourceService





