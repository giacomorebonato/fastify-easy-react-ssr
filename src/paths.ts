import Path from 'path'

const APP_ROOT = process.cwd()
const ENTRY_SERVER_BASE_FILENAME = 'entry-server'

export const entryServerDevPaths = [
  Path.resolve(APP_ROOT, ENTRY_SERVER_BASE_FILENAME + '.js'),
  Path.resolve(APP_ROOT, ENTRY_SERVER_BASE_FILENAME + '.jsx'),
  Path.resolve(APP_ROOT, ENTRY_SERVER_BASE_FILENAME + '.tsx'),
  Path.resolve(APP_ROOT, 'lib', ENTRY_SERVER_BASE_FILENAME + '.js'),
  Path.resolve(APP_ROOT, 'lib', ENTRY_SERVER_BASE_FILENAME + '.jsx'),
  Path.resolve(APP_ROOT, 'lib', ENTRY_SERVER_BASE_FILENAME + '.tsx'),
  Path.resolve(APP_ROOT, 'src', ENTRY_SERVER_BASE_FILENAME + '.js'),
  Path.resolve(APP_ROOT, 'src', ENTRY_SERVER_BASE_FILENAME + '.jsx'),
  Path.resolve(APP_ROOT, 'src', ENTRY_SERVER_BASE_FILENAME + '.tsx'),
  Path.resolve(
    APP_ROOT,
    'src',
    '__tests__',
    ENTRY_SERVER_BASE_FILENAME + '.tsx'
  ),
]

export const entryServerProdPaths = [
  Path.resolve(APP_ROOT, 'dist', 'server', ENTRY_SERVER_BASE_FILENAME + '.js'),
]
