import { useEventListener } from '@/composable/useEventListener'

export function useOnClickOutside(rootElement: Ref<HTMLElement | null>, callback: () => any) {
  // `mousedown` or `mouseup` is better than `click` here because it doesn't PROPAGATION like `click`
  // If you use `click` here, the callback will be run immediately.
  useEventListener(window, 'mouseup', (e: any) => {
    // e: Event
    const clickedElement = e.target
    // Ignore if the root element contains the clicked element
    if (clickedElement && rootElement.value?.contains(clickedElement)) {
      return
    }
    // Execute action
    callback()
  })

  useEventListener(window, 'keydown', (e: any) => {
    // e: Event
    if (e.key !== 'Escape') return

    const clickedElement = e.target
    // Ignore if the root element contains the clicked element
    if (rootElement.value?.contains(clickedElement)) {
      return
    }
    // Execute action
    callback()
  })
}