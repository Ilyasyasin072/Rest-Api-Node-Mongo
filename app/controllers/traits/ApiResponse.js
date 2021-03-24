    function ApiResponser(message, result, code) {
    this.data = {
        message : 'GET',
        result : result,
        code : code,
    }
  }

  module.exports = ApiResponser;