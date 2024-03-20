import { useEffect } from 'react'
import NProgress from 'nprogress'
import { Spinner } from "react-bootstrap"

export function SuspenseLoader() {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <div className="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100">
      <Spinner animation="border" />
    </div>
  )
}

export function LoaderRequest() {
  return (
    <div className="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100">
      <Spinner animation="border" />
    </div>
  )
}
