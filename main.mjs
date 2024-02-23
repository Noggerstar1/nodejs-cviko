import fs from 'fs';

const readAndWriteToFile = (filePath) => {
    fs.readFile(filePath, 'UTF8', (err, data) => {
        if(err) {
            console.error(`Nepodařilo se přečíst soubor: ${err.message}.`);
            return;
        }

        const [sourceFile, targetFile] = data.split(' ');

        fs.stat(sourceFile, (err) => {
            if(err) {
                console.error(`Soubor "${sourceFile}" neexistuje.`);
                return;
            }
            
            fs.readFile(sourceFile, 'UTF8', (err, data) => {
                if(err) {
                    console.error(`Nepodařilo se přečíst soubor: ${err.message}.`);
                    return;
                }
                fs.writeFile(targetFile, data, (err) => {
                    if (err) {
                      return console.error(`Nepodařilo se zapsat do souboru: ${err.message}`);
                    }


                })
            })
        })
    })
}

readAndWriteToFile("instrukce.txt");
