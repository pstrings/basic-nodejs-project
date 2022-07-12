const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
    // we are storing the url from the request in a variable
    const url = req.url
    const method = req.method

    if(url === "/") {
        res.write(`
            <html>
                <head>
                    <title>Enter Message</title>
                    <body>
                        <form action ="/message" method="POST">
                            <input type="text" name="message">
                            <button type="Submit">Send</button>
                        </form>
                    </body>
                </head>
            </html>
        `)
        // Here we are returning res.end because we don't want the res below if to be sent.
        return res.end()
    }

    if (url === "/message" && method === "POST") {
        fs.writeFileSync("message.txt", "DUMMY")

        // This will do the same thing as statusCode + setHeader Location combined
        // res.writeHead(302, {Location: "/"})

        res.statusCode = 302
        res.setHeader("Location", "/")
        return res.end()
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
})

server.listen(3000)