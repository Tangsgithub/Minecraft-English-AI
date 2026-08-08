const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf8');

// Replace standard fetch pattern
code = code.replace(/if \(resp\.ok\) \{\n\s*return await resp\.json\(\);\n\s*\}/g, 
  `if (resp.ok) {
        return await resp.json();
      } else {
        try {
          const errData = await resp.json();
          return errData;
        } catch (e) {
          console.warn('Non-JSON error response:', resp.status);
          return null;
        }
      }`);

code = code.replace(/if \(resp\.ok\) \{\n\s*const data = await resp\.json\(\);\n\s*if \(data\.success\) return true;\n\s*\}/g,
  `if (resp.ok) {
        const data = await resp.json();
        if (data.success) return true;
      } else {
        console.warn('Request failed with status:', resp.status);
      }`);

code = code.replace(/if \(resp\.ok\) \{\n\s*const data = await resp\.json\(\);\n\s*if \(data\.profile\) return data\.profile as UserProfile;\n\s*\}/g,
  `if (resp.ok) {
        const data = await resp.json();
        if (data.profile) return data.profile as UserProfile;
      }`);

code = code.replace(/if \(resp\.ok\) \{\n\s*const data = await resp\.json\(\);\n\s*if \(data\.profile\) return \{ profile: data\.profile, email: cleanEmail \};\n\s*\}/g,
  `if (resp.ok) {
        const data = await resp.json();
        if (data.profile) return { profile: data.profile, email: cleanEmail };
      }`);

fs.writeFileSync('src/lib/firebase.ts', code);
