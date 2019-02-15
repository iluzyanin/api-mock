export const withPreventDefault = handle => e => {
  e.preventDefault()
  e.stopPropagation()
  handle()
}
