import { useEffect, useState } from "react"

function useFetch(endpoint, params) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await endpoint(params)
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [endpoint, params])
  return { response, error }
}

export default useFetch
