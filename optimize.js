const fs = require('fs');
const files = [
  "src/app/admin/transactions/page.tsx",
  "src/app/supplier/transactions/page.tsx",
  "src/app/supplier/profile/page.tsx",
  "src/app/supplier/repayments/page.tsx",
  "src/app/investor/transactions/page.tsx",
  "src/app/investor/profile/page.tsx",
  "src/app/investor/returns/page.tsx",
  "src/app/supplier/payouts/page.tsx"
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('"use client";')) {
    content = content.replace(/"use client";\n*/g, '');
    fs.writeFileSync(file, content);
    console.log("Optimized", file);
  }
}
