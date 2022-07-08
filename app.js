const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req)
    // process.exit()

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