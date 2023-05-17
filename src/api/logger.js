import Boom from "@hapi/boom";

export function validationError(request, h, error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
}

export function log(message){
    console.log("#INFO: "+ message);
}
