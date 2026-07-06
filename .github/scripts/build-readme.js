#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const Handlebars = require('handlebars');

async function loadJSONFiles(dir) {
  const out = {};
  try {
    const files = await fs.readdir(dir);
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      const key = path.basename(f, '.json');
      try {
        const txt = await fs.readFile(path.join(dir, f), 'utf8');
        out[key] = JSON.parse(txt);
      } catch (e) {
        console.warn('Could not read/parse', f, e.message);
        out[key] = null;
      }
    }
  } catch (e) {
    // directory may not exist
  }
  return out;
}

async function registerPartials(dir) {
  try {
    const files = await fs.readdir(dir);
    for (const f of files) {
      const filePath = path.join(dir, f);
      const stat = await fs.stat(filePath);
      if (stat.isFile() && f.endsWith('.hbs')) {
        const name = path.basename(f, '.hbs');
        const content = await fs.readFile(filePath, 'utf8');
        Handlebars.registerPartial(name, content);
      }
    }
  } catch (e) {
    // no partials
  }
}

async function build() {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const templatesDir = path.join(repoRoot, '.github', 'templates');
  const partialsDir = path.join(templatesDir, 'partials');

  // load data
  const dataDir = path.join(repoRoot, 'data');
  const apiDir = path.join(repoRoot, 'api');
  const data = await loadJSONFiles(dataDir);
  const api = await loadJSONFiles(apiDir);

  // register partials
  await registerPartials(partialsDir);

  // load main template
  const mainTemplatePath = path.join(templatesDir, 'main.hbs');
  let templateSource = '';
  try {
    templateSource = await fs.readFile(mainTemplatePath, 'utf8');
  } catch (e) {
    console.error('Missing main template at', mainTemplatePath);
    process.exit(1);
  }

  const template = Handlebars.compile(templateSource);

  const context = {
    data,
    api,
    generatedAt: new Date().toISOString(),
  };

  const output = template(context);

  const outPath = path.join(repoRoot, 'README.md');
  await fs.writeFile(outPath, output, 'utf8');
  console.log('README.md generated at', outPath);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
