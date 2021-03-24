// const apiResponser = async(message, result, code, req, res) => {
//     return res.json({
//         message : message,
//         result : result,
//         code : code
//     })
// }

function index() {
     const info = this.data
    console.log(info);
}
  
  function ApiResponser(message, result, code) {
    this.data = {
        message : 'GET',
        result : result,
        code : code,
    }
  }
  
  ApiResponser.prototype.sayHello = index;

  module.exports = ApiResponser;