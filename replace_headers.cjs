const fs = require('fs');
const path = require('path');
const pagesDir = 'c:/Users/kaauu/OneDrive/Desktop/SIH/client/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the header tag
  const headerStart = content.indexOf('<header className="site-header">');
  if (headerStart !== -1) {
    const headerEnd = content.indexOf('</header>', headerStart) + 9;
    const before = content.substring(0, headerStart);
    const after = content.substring(headerEnd);
    
    // Replace with Header component
    content = before + '<Header />' + after;
    
    // Add import if not exists
    if (!content.includes('import Header from') && !content.includes('import { Header }')) {
      content = 'import Header from "@/components/Header";\n' + content;
    }
    
    // Optionally remove unneeded Lucide imports like Menu, X, LogIn, Search, Mark if they were only used in the header
    // This is optional, TS might complain about unused imports, which we can fix after.
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
});
