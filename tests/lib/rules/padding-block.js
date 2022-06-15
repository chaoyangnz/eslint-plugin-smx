/**
 * @fileoverview padding blocks with empty lines before and after when needed
 * @author Chao
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/padding-block"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("padding-block", rule, {
  valid: [
    // give me some code that won't trigger a warning
    `function fn() {}`,
    `function fn() { const a = 1 }`,
    `
    function fn() { 
      const a = 1 
    }
    `,
    `
    function fn() { 
    
      const a = 1
      const b = 2 
      
    }
    `,
    `
    function fn() { 
    
      const a = 1
      const b = 2 
      String(new Date())
      
    }
    `,
  ],

  invalid: [
    {
      code: `function fn() { const a = 1; const b = 2; }`,
      errors: [
        { message: "A single empty line is needed at the beginning of the block", type: "BlockStatement" },
        { message: "A single empty line is needed at the end of the block", type: "BlockStatement" }
      ],
    },
    {
      code: `function fn() { 
      const a = 1; 
      const b = 2; 
      
      }`,
      errors: [
        { message: "A single empty line is needed at the beginning of the block", type: "BlockStatement" }
      ],
    },
    {
      code: `function fn() { 
      
      const a = 1; 
      const b = 2; 
      }`,
      errors: [
        { message: "A single empty line is needed at the end of the block", type: "BlockStatement" }
      ],
    },
  ],
});