import fs from 'fs';

const writeFiles = (filePath) => {
    fs.readFile(filePath, 'UTF8', (err, data) => {
        if(err) {
            console.error(`Nepodařilo se přečíst soubor: ${filePath}. ${err.message}.`);
            return;
        }
        if(!data || typeof data!=="string" || isNaN(data)) {
            return;
        }

        let promises = [];

        for (let i = 0; i < parseInt(data); i++) {
            const promise = new Promise((resolve, reject) => {
                fs.writeFile(`${i}.txt`, `Soubor ${i}`, (err) => {
                    if (err) {
                        console.error(`Nepodařilo se zapsat do souboru: ${err.message}`);
                        reject("error")
                    }
                    resolve("success")      
                })
            })
            promises.push(promise);    
        }
        
        
        Promise.all(promises)
            .then(() => {
                console.log("Všechny soubory byly úspěšně vytvořeny");
            })
            .catch((err) => {
                console.log(`Chyba při vytváření souborů: ${err.message}`)
            })

    })
}

writeFiles("instrukce.txt")
