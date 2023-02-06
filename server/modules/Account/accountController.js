
function GetAccountDetails (request, response ){
   response.send({message:"account Details", data: request.userData})
}

module.exports = { GetAccountDetails }