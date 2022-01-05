function handleSuccess(data, res) {
  res.setHeader("Content-Type", "aplication/json");
  res.end(JSON.stringify({ success: true, data: data }));
}

function handleError(error, res, statusCode = 400) {
  res.setHeader("Content-Type", "application/json");

  res
    .status(statusCode)
    .end(JSON.stringify({ sucess: false, error: error.errors }));
}

module.exports = { handleSuccess: handleSuccess, handleError: handleError };
