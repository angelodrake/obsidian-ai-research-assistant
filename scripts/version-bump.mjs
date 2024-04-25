import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const targetVersion = process.env.npm_package_version
// set correct manifest file based on type of release
const args = process.argv
let manifestFile = args[0] === 'beta' ? 'manifest-beta.json' : 'manifest.json';

console.log(`Bumping version to ${targetVersion}...`)

// read minAppVersion from manifest.json and bump version to target version
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))
const { minAppVersion } = manifest
manifest.version = targetVersion

writeFileSync(
  join('dist', manifestFile),
  JSON.stringify(manifest, null, '\t')
)

writeFileSync(manifestFile, JSON.stringify(manifest, null, '\t'))

// update versions.json with target version and minAppVersion from manifest.json
const versions = JSON.parse(readFileSync('versions.json', 'utf8'))
versions[targetVersion] = minAppVersion
writeFileSync(
  join('dist', 'versions.json'),
  JSON.stringify(versions, null, '\t')
)

writeFileSync('versions.json', JSON.stringify(versions, null, '\t'))
