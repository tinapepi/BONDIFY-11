import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const sourcePath=process.env.BONDIFY_HTML || 'index.html';
const exists=fs.existsSync(sourcePath);
test('Bondify HTML source supplied for acceptance tests',()=>{assert.ok(exists,'Missing index.html; upload tested game source to this branch');});
if(exists){
 const html=fs.readFileSync(sourcePath,'utf8');
 test('Personalized story entry exists',()=>assert.match(html,/storyBook\s*\(|B18_open\s*\(/));
 test('Character creation completion control exists',()=>assert.match(html,/data-bf=["']done["']/));
 test('Character profile data exists',()=>assert.match(html,/S\.cust|BF\.d/));
 test('Legacy direct-room bypass is not present',()=>assert.doesNotMatch(html,/introduktionen visas nu efter SPELA – direkt in i spelet här/));
 test('No duplicate BF_finish function assignments',()=>{
   const n=(html.match(/\bBF_finish\s*=\s*function/g)||[]).length;
   assert.ok(n<=1,'Found '+n+' BF_finish assignments; requires flow audit');
 });
}
