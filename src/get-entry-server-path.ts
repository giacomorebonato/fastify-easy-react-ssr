import Fs from 'fs'
import { entryServerDevPaths, entryServerProdPaths } from './paths.js'

const NODE_ENV = process.env['NODE_ENV']

export const getEntryServerPath = () => {
  const filePaths =
    NODE_ENV === 'production' ? entryServerProdPaths : entryServerDevPaths

  for (let filePath of filePaths) {
    if (Fs.existsSync(filePath)) {
      return filePath
    }
  }

  throw Error(
    `Couldn't find entry-server file in any of\n${filePaths.join('\n')}`
  )
}
