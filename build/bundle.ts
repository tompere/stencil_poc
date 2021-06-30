const path = require('path')
const fs = require('fs-extra')
const { bundleCode } = require('@wix/cloud-bundler-core')
const tmp = require('tmp');

const isString = (val) => typeof val === 'string'

const createTempDir = () =>
  new Promise((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, (err, name, removeCallback) => {
      if (err) {
        reject(err);
      } else {
        resolve({ name, removeCallback });
      }
    });
  });

const withFile = async (file, callback, remove?) => {
  const tmpDir = await createTempDir();

  const relativeFilePath = path.join('public', 'pages', `${file.pageId}.js`);
  const filePath = path.join(tmpDir.name, relativeFilePath);

  try {
    await fs.outputFile(filePath, file.content, 'utf8');
    return await callback(tmpDir.name, relativeFilePath);
  } finally {
    tmpDir.removeCallback();
  }
};

// Required to make bundler-core-ng happy
const npmRootPath = __dirname;
const sourceMapUrl = 'http://localhost';

async function main(files) {

  if (files.length === 0) {
    throw new Error('Expected a non empty files list')
  }

  files.forEach((file) => {
    if (!isString(file.pageId) || !isString(file.content)) {
      throw new Error('Expected file pageId and content attributes to be strings')
    }
  });

  const result = await Promise.all(
    files.map((file) =>
      withFile(
        file,
        async (codeRootPath, relativeFilePath) => {
          const content = await bundleCode(
            codeRootPath,
            relativeFilePath,
          );

          return { pageId: file.pageId, code: content };
        },
      ),
    ),
  );

  return result
}

const [,, target] = process.argv

if (!target) {
  throw new Error(`target fle to bundle was not supplied`)
}

const targetContent = fs.readFileSync(path.resolve(target)).toString()

main([
  { pageId: 'wham1bam', content: targetContent }
]).then(([{pageId, code: { content }}]) => {
  const f = path.resolve('.', `code_${Date.now()}.js`)
  fs.outputFileSync(f, content, 'utf8')
  console.log(`created file ${f}`)
})