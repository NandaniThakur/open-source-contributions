const fs = require('fs');

// 💡 Check if contributions.json exists
if (!fs.existsSync('contributions.json')) {
  console.error('❌ contributions.json not found!');
  process.exit(1);
}

// ✅ Load the data
const data = JSON.parse(fs.readFileSync('contributions.json', 'utf8'));

// 🎨 Optional: Convert status to emoji
function getStatusEmoji(status) {
  if (status === 'merged') return '✅';
  if (status === 'open') return '🟡';
  if (status === 'closed') return '❌';
  return '';
}

// 🛠️ Build the README content
let readme = `# 🌱 Nandani's Open Source Contributions\n\n`;
readme += `> Auto-generated from \`contributions.json\`\n\n`;

readme += `| Project | PR | Description | Status | Date |\n`;
readme += `|---------|----|-------------|--------|------|\n`;

data.forEach(entry => {
  const { project, pr, url, description, status, date } = entry;
  const statusIcon = getStatusEmoji(status);
  readme += `| ${project} | [${pr}](${url}) | ${description} | ${statusIcon} ${status} | ${date} |\n`;
});

// 💾 Save the README file with a trailing newline
fs.writeFileSync('README.md', readme + '\n');

console.log('✅ README.md updated with your contributions!');
