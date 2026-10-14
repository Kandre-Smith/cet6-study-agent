import { describe, expect, it } from 'vitest';

function tokenize(text) { return (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []); }
function compare(input, reference) {
  const typed=tokenize(input), target=tokenize(reference), remaining=[...typed];
  const missed=target.filter(word=>{const i=remaining.indexOf(word);if(i<0)return true;remaining.splice(i,1);return false;});
  return Math.max(0,Math.round((1-missed.length/target.length)*100));
}

describe('offline helpers',()=>{
  it('tokenizes English contractions',()=>expect(tokenize("Students can't wait.")).toEqual(['students',"can't",'wait']));
  it('scores a perfect dictation',()=>expect(compare('A useful idea.','A useful idea.')).toBe(100));
  it('penalizes missing words',()=>expect(compare('A idea.','A useful idea.')).toBe(67));
});
