const GITHUB_API = 'https://api.github.com/repos/IPdotSetAF/LinkList/releases/latest';

document.getElementById('open-github').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/IPdotSetAF/LinkList' });
});
document.getElementById('open-site').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://ipdotsetaf.ir' });
});

const versionLabel = document.getElementById('version-label');
const manifest = chrome.runtime.getManifest();
if (versionLabel && manifest.version) {
  versionLabel.textContent = `v${manifest.version}`;
}

async function checkLatest() {
  try {
    const manifest = chrome.runtime.getManifest();
    const current = manifest.version;

    const res = await fetch(GITHUB_API, {cache: 'no-store'});
    if (!res.ok) return;
    const data = await res.json();
    const latestTag = data.tag_name || data.name || data.tag;
    const latestVersion = latestTag ? latestTag.replace(/^v/i, '') : null;

    if (latestVersion && isVersionGreater(latestVersion, current)) {
      const link = document.createElement('a');
      link.textContent = `New version ${latestVersion} available`;
      link.href = data.html_url || `https://github.com/IPdotSetAF/LinkList/releases/latest`;
      link.className = 'update-link';
      link.target = '_blank';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: link.href });
      });
      document.getElementById('update-area').appendChild(link);
    }
  } catch (err) {
    console.error('Update check failed', err);
  }
}

function isVersionGreater(a, b){
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for(let i=0;i<Math.max(pa.length,pb.length);i++){
    const na = pa[i]||0, nb = pb[i]||0;
    if(na>nb) return true;
    if(na<nb) return false;
  }
  return false;
}

checkLatest();
