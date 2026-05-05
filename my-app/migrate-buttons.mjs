import fs from 'fs';
import path from 'path';

const files = [
  'components/product/ProductSidebar.tsx',
  'components/product/ProductCard.tsx',
  'components/layout/Header.tsx',
  'components/home/NewsPreview.tsx',
  'components/home/HeroSection.tsx',
  'components/home/FeaturedProducts.tsx',
  'components/home/FactoryPreview.tsx',
  'components/home/CertificatesPreview.tsx',
  'components/home/ApplicationsPreview.tsx',
  'app/page.tsx',
  'app/certificates/page.tsx',
  'app/applications/page.tsx'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Add import if not present and there are buttons
  if (content.includes('className="btn') || content.includes('className=\`btn') || content.includes('"btn ')) {
    if (!content.includes('import { Button } from')) {
      const imports = content.match(/^import .*$/gm) || [];
      if (imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        content = content.replace(lastImport, lastImport + '\nimport { Button } from "@/components/common/Button";');
      } else {
        content = 'import { Button } from "@/components/common/Button";\n' + content;
      }
    }
  }

  // Find all <Link ...> or <a ...> that have className="btn ..."
  const regex = /<(a|Link)[^>]*className="([^"]*btn[^"]*)"([^>]*)>/g;
  
  content = content.replace(regex, (match, tag, classes, rest) => {
    let variant = 'primary';
    let size = 'default';
    let customClasses = [];
    
    classes.split(' ').forEach(cls => {
      if (cls === 'btn-primary') variant = 'primary';
      else if (cls === 'btn-secondary') variant = 'secondary';
      else if (cls === 'btn-outline-light') variant = 'outline-light';
      else if (cls === 'btn-small') size = 'small';
      else if (cls !== 'btn') customClasses.push(cls);
    });
    
    let props = [];
    if (variant !== 'primary') props.push(`variant="${variant}"`);
    if (size !== 'default') props.push(`size="${size}"`);
    if (customClasses.length > 0) props.push(`className="${customClasses.join(' ')}"`);
    
    // Also need to get href, etc. from the match, but we can just preserve everything else
    // Wait, the match might look like: <Link className="btn btn-primary" href="/contact">
    // So `rest` is ` href="/contact"`. Wait, the regex `/<(a|Link)[^>]*className="([^"]*btn[^"]*)"([^>]*)>/g`
    // doesn't capture what is *before* className.
    return match; // I'll skip regex replacement here and do it safely using AST or manual replacements
  });
}
