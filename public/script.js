document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const movieId = btn.dataset.id
    fetch(`/deleteMovie/${movieId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => location.reload())
      .catch(err => console.error(err))
  })
})
