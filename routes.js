const fs = require("fs")

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if(url === "/") {
        res.write(`
            <html>
                <head>
                    <title>Enter Message</title>
                    <body>
                        <form action="/message" method="POST">
                            <input type="text" name="message">
                            <button type="Submit">Send</button>
                        </form>
                    </body>
                </head>
            </html>
        `)
        return res.end()
    }

    if (url === "/message" && method === "POST") {
        const body = []
        req.on("data", (chunk) => {
          body.push(chunk)
        })

        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString()

            const message = parsedBody.split("=")[1]
            fs.writeFile("message.txt", message, err => {
                res.statusCode = 302
                res.setHeader("Location", "/")
                return res.end()
            })
        })
    }

    res.setHeader("Content-Type", "text/html")
    res.write(`
        <html>
            <head>
                <title>My First Page</title>
                <body>
                    <h1>Hello From NodeJS Server!</h1>
                </body>
            </head>
        </html>
    `)
    res.end()
}

module.exports = requestHandler