module.exports = {
        //function that will handle the promise error (will handle errors that might occur)

        //the errorHandler function returns a callback anonymus function 
        //which deals with returning the async function
    errorHandler:  (fn) => 
         (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next); //hand the errors to express 
        }
    }
