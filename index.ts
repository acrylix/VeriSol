import { path, __dirname } from 'path'
import * as solc from 'solc'
import { fs } from 'fs-extra'

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'filename.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

console.log("Starting compilation ...");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // exists or create

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}