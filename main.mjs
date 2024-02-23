import fs from 'fs';

const readAndWriteToFile = (filePath) => {
    fs.readFile(filePath, 'UTF8', (err, data) => {
        if(err) {
            console.error(`Nepodařilo se přečíst soubor: ${filePath}. ${err.message}.`);
            return;
        }

        const [sourceFile, targetFile] = data.split(' ');
    
        fs.readFile(sourceFile, 'UTF8', (err, data) => {
            if(err) {
                console.error(`Nepodařilo se přečíst soubor: ${sourceFile}. ${err.message}.`);
                return;
            }

            fs.writeFile(targetFile, data, (err) => {
                if (err) {
                    return console.error(`Nepodařilo se zapsat do souboru: ${err.message}`);
                }
                
            })
        })
        
    })
}

readAndWriteToFile("instrukce.txt");
