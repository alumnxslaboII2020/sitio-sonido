const api = {
  getSongByOrder: (order = 0) =>
    fetch(`/api/get-song?order=${order}`, { method: "GET" }),
}

export default api
