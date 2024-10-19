import FormData from "form-data";

function fdSubmit(fd: FormData, url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fd.submit(url, (error, resp) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            console.log(resp)

            resolve("done...")
        })
    })
}

export {
    fdSubmit
}