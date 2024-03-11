import http from 'http'
import chalk from 'chalk'
import fs from 'fs';

const port = 3000

const counterFile = "counter.txt";

const readCounter = async () => {
    return new Promise((resolve) => {
        fs.readFile(counterFile, 'UTF8', (err, data) => {
            if(err) {
                console.error(`Soubor counter.txt zatím neexistuje.`);
                resolve(0);
            }
            resolve(Number(data));
        })
    })
}

const updateCounter = (isIncrease) => {
    fs.readFile(counterFile, 'UTF8', (err, data) => {
        if(err || data.length===0 || isNaN(data)) {
            console.error(`Vytvářím soubor counter.txt`);
            fs.writeFile(counterFile, "0", (err) => {
                if (err) {
                    console.error(`Nepodařilo se zapsat do souboru: ${err.message}`);
                    throw Error ("Vyskytla se chyba při čtení");
                }
            })
            return "ok";
        }

        let newValue = isIncrease ? parseInt(data)+1 : parseInt(data)-1;
        
        fs.writeFile(counterFile, newValue.toString(), (err) => {
            if (err) {
                console.error(`Nepodařilo se zapsat do souboru: ${err.message}`);
                return "vyskytla se chyba při zápisu";
            }
        })

        return "ok"
    })
}

const ok200Response = (res, msg) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(msg.toString())
    res.end()
    return res;
}

const server = http.createServer(async (req, res) => {

  if(req.url === "/increase") {
    updateCounter(true);
    ok200Response(res, "ok");
  } else if(req.url === "/decrease") {
    updateCounter(false);
    ok200Response(res, "ok");
  } else if(req.url === "/read") {
    const counter = await readCounter();
    ok200Response(res, counter);
  } else {
    
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request: The requested endpoint is not supported.');
  }
})

server.listen(port, () => {
  console.log(chalk.green(`Server listening at http://localhost:${port}`))
})