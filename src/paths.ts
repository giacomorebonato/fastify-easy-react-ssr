import Path from 'path'

const APP_ROOT = process.cwd()
const ENTRY_SERVER_BASE_FILENAME = 'entry-server'

export const entryServerDevPaths = [
  Path.join(APP_ROOT, ENTRY_SERVER_BASE_FILENAME + '.js'),
  Path.join(APP_ROOT, ENTRY_SERVER_BASE_FILENAME + '.jsx'),
  Path.join(APP_ROOT, ENTRY_SERVER_BASE_FILENAME + '.tsx'),
  Path.join(APP_ROOT, 'lib', ENTRY_SERVER_BASE_FILENAME + '.js'),
  Path.join(APP_ROOT, 'lib', ENTRY_SERVER_BASE_FILENAME + '.jsx'),
  Path.join(APP_ROOT, 'lib', ENTRY_SERVER_BASE_FILENAME + '.tsx'),
  Path.join(APP_ROOT, 'src', ENTRY_SERVER_BASE_FILENAME + '.js'),
  Path.join(APP_ROOT, 'src', ENTRY_SERVER_BASE_FILENAME + '.jsx'),
  Path.join(APP_ROOT, 'src', ENTRY_SERVER_BASE_FILENAME + '.tsx'),
  Path.join(APP_ROOT, 'src', '__tests__', ENTRY_SERVER_BASE_FILENAME + '.tsx'),
].map((filePath) => Path.resolve(filePath))

export const entryServerProdPaths = [
  Path.join(APP_ROOT, 'dist', 'server', ENTRY_SERVER_BASE_FILENAME + '.js'),
].map((filePath) => Path.resolve(filePath))
