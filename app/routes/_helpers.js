function handleResponse(res, code, status) {
  res.status(code).json({ status });
}

module.exports = {
  handleResponse
}