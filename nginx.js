const { writeFile, readFileSync, unlinkSync, existsSync } = require("fs");
const { resolve } = require("path");
const dotenv = require("dotenv");
const root = process.cwd();

function createNginxConfig(config) {
  const str = `
  server {
    listen       ${config["VITE_DEPLOYMENT_PORT"]};
    server_name  localhost;
    error_page  405     =200 $uri;
    
    location / {
      root   /usr/share/nginx/html;
      try_files  $uri $uri/ @router;
      autoindex on;       
      autoindex_exact_size off;   
      charset utf-8;        
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      index  index.html index.htm;
    }
${JSON.parse(config["VITE_PROXY"])
  .map(([key, val]) => {
    return `
    location ${key}{
      rewrite ^${key}/(.*)$ /$1 break;
      proxy_pass  ${val};
    }
    `;
  })
  .join(" ")}
    location @router{
      rewrite ^.*$ /index.html last;
    }
  }
  `;
  return str;
}

async function markConf(config) {
  const output = resolve(root, "nginx.conf");
  const data = createNginxConfig(config);
  await writeFile(output, data, () => {
    //
  });
}

function init() {
  const nginxURL = resolve(root, "nginx.conf");
  const configUrl = resolve(root, ".env.production");
  if (existsSync(nginxURL)) {
    unlinkSync(nginxURL);
  }
  const envContent = readFileSync(configUrl, "utf-8");
  const envConfig = dotenv.parse(envContent);
  markConf(envConfig);
}

init();
