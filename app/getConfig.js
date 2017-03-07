import path from 'path';

export default function getConfig (file) {
  const configPath = path.join(process.cwd(), '/config');
  const fullPath = path.resolve(configPath, `${file}.js`);
  try {
    const config = require(fullPath).default;
    return config;
  } catch (e) {
    console.error(`Configuration file not found at ${fullPath} (import default)`);
  }
};
