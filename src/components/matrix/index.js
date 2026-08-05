export default {
  props: ['propMatrix'],
  render() {
    const matrix = this.propMatrix || []
    return (
      <div class="matrix">
        {matrix.map((p, k1) =>
          <p key={k1}>
            {p.map((e, k2) =>
              <b key={k2} class={(e === 1 ? 'c' : '') + (e === 2 ? 'd' : '')} />
            )}
          </p>
        )}
      </div>
    )
  }
}
