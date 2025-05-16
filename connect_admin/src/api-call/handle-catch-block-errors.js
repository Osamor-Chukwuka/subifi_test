export function HandleCatchBlockError(error) {
    if (error.message.includes("timeout")) {
        return "The request timed out. Please try again.";
    }
    else if (error.message.includes("NetworkError")) {
        return "There was a network error. Please check your internet connection.";
    }
    else{
        return `An error occurred: ${error.message ? error.message : 'An unknown error occurred'}`;
    }
}